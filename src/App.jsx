import { useState, useEffect } from "react";
import jsPDF from "jspdf";

// ------------------ Reusable Input Field ------------------
function InputField({ label, type = "text", value, onChange }) {
  return (
    <div style={{ marginBottom: 15, textAlign: "left", width: "100%" }}>
      <label style={{ fontWeight: "bold", color: "black" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 5,
          borderRadius: 6,
          border: "1px solid #777",
          fontSize: 16,
          background: "#ADD8E6",
          color: "black",
        }}
      />
    </div>
  );
}

// ------------------ Login ------------------
function Login({ switchToSignup, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setMessage("Login successful! 🎉");
      onLoginSuccess();
    } else {
      setMessage("Invalid username or password ❌");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h1 style={{ color: "black" }}>Login</h1>
        <InputField label="Username:" value={username} onChange={setUsername} />
        <InputField
          label="Password:"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <button
          onClick={handleLogin}
          style={buttonStyle}
          disabled={!username || !password}
        >
          Login
        </button>
        {message && <p style={{ marginTop: 10, color: "black" }}>{message}</p>}
        <p style={{ marginTop: 20, color: "black" }}>
          Don’t have an account?{" "}
          <button onClick={switchToSignup} style={linkButtonStyle}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

// ------------------ Signup ------------------
function Signup({ switchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = () => {
    if (!username || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields ❌");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match ❌");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.username === username)) {
      setMessage("Username already exists ❌");
      return;
    }
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Signup successful! 🎉");
    setTimeout(() => switchToLogin(), 1500);
  };

  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h1 style={{ color: "black" }}>Sign Up</h1>
        <InputField label="Username:" value={username} onChange={setUsername} />
        <InputField
          label="Email:"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <InputField
          label="Password:"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <InputField
          label="Confirm Password:"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <button
          onClick={handleSignUp}
          style={buttonStyle}
          disabled={!username || !email || !password || !confirmPassword}
        >
          Sign Up
        </button>
        {message && <p style={{ marginTop: 10, color: "black" }}>{message}</p>}
        <p style={{ marginTop: 20, color: "black" }}>
          Already have an account?{" "}
          <button onClick={switchToLogin} style={linkButtonStyle}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

// ------------------ About Intro ------------------
function AboutIntro({ goNext }) {
  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h1 style={{ color: "black" }}>About This App</h1>
        <p style={{ marginTop: 20, lineHeight: 1.6, fontSize: 16, color: "black" }}>
          Welcome! This app helps Southwark and Lambeth tenants who are facing
          eviction due to rent arrears. It guides you through preparing your
          housing duty case and understanding your rights.
        </p>
        <p style={{ marginTop: 15, color: "black" }}>
          Our goal is to stand by tenants during a difficult and often
          overwhelming time, offering clear information and guidance so they can
          move through the eviction process with confidence and support. When
          you're ready, we can take the first step together by checking whether
          you might qualify for legal aid.
        </p>
        <button onClick={goNext} style={{ ...buttonStyle, marginTop: 30 }}>
          Continue
        </button>
      </div>
    </div>
  );
}

// ------------------ About Dashboard ------------------
function About({ goBack }) {
  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h1 style={{ color: "black" }}>About</h1>
        <p style={{ marginTop: 20, lineHeight: 1.6, fontSize: 16, color: "black" }}>
          Our app is designed to support social housing tenants in Southwark and
          Lambeth who are at risk of eviction due to unpaid rent. It provides
          easy access to legal guidance and resources, helping tenants prepare
          the necessary documents and information for court proceedings.
        </p>
        <p style={{ marginTop: 15, color: "black" }}>
          Our goal is to stand by tenants during a difficult and often
          overwhelming time, offering clear information and guidance so they can
          move through the eviction process with confidence and support. When
          you're ready, we can take the first step together by checking whether
          you might qualify for legal aid.
        </p>
        <button onClick={goBack} style={{ ...buttonStyle, marginTop: 30 }}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

// ------------------ Legal Aid ------------------
function LegalAidCheck({ goNext }) {
  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h1 style={{ color: "black" }}>Check Legal Aid Eligibility</h1>
        <p style={{ marginTop: 20, lineHeight: 1.6, fontSize: 16, color: "black" }}>
          You can check if you are eligible for legal aid using the official UK
          government website.
        </p>
        <a
          href="https://www.gov.uk/check-legal-aid"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: 20,
            padding: "10px 20px",
            background: "#3182CE",
            color: "black",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: 16,
          }}
        >
          Go to Legal Aid Checker
        </a>
        <button onClick={goNext} style={{ ...buttonStyle, marginTop: 20 }}>
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}

// ------------------ Card ------------------
function Card({ icon, title, buttonText, onClick }) {
  return (
    <div style={cardStyle}>
      <div style={iconStyle}>{icon}</div>
      <h3 style={{ color: "black" }}>{title}</h3>
      <button onClick={onClick} style={buttonStyle}>
        {buttonText}
      </button>
    </div>
  );
}

// ------------------ Dashboard ------------------
function Dashboard({ switchPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={dashboardStyle}>
      <nav style={navStyle}>
        <h2 style={{ margin: 0, color: "black" }}>Housing Duty Dashboard</h2>
        {isMobile ? (
          <>
            <button
              style={hamburgerButtonStyle}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
            {menuOpen && (
              <div style={mobileMenuStyle}>
                {[
                  "Home",
                  "Build your case",
                  "Support",
                  "Know Your Rights",
                  "About",
                  "Check Legal Aid",
                ].map((pageName) => (
                  <button
                    key={pageName}
                    style={navButtonStyle}
                    onClick={() => {
                      setMenuOpen(false);
                      switchPage(
                        pageName === "Home"
                          ? "dashboard"
                          : pageName === "Build your case"
                          ? "prepareCase"
                          : pageName === "Support"
                          ? "support"
                          : pageName === "Know Your Rights"
                          ? "knowYourRights"
                          : pageName === "About"
                          ? "aboutDashboard"
                          : "legalAid"
                      );
                    }}
                  >
                    {pageName}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div style={desktopNavLinksStyle}>
            {[
              "Home",
              "Build your case",
              "Support",
              "Know Your Rights",
              "About",
              "Check Legal Aid",
            ].map((pageName) => (
              <button
                key={pageName}
                style={navButtonStyle}
                onClick={() =>
                  switchPage(
                    pageName === "Home"
                      ? "dashboard"
                      : pageName === "Build your case"
                      ? "prepareCase"
                      : pageName === "Support"
                      ? "support"
                      : pageName === "Know Your Rights"
                      ? "knowYourRights"
                      : pageName === "About"
                      ? "aboutDashboard"
                      : "legalAid"
                  )
                }
              >
                {pageName}
              </button>
            ))}
          </div>
        )}
      </nav>
      <div style={dashboardGridStyle}>
        <Card
          icon="📄"
          title="Build your case"
          buttonText="Build your case"
          onClick={() => switchPage("prepareCase")}
        />
        <Card
          icon="🤝"
          title="Find support services"
          buttonText="View Resources"
          onClick={() => switchPage("support")}
        />
        <Card
          icon="⚖️"
          title="Know your rights"
          buttonText="Learn More"
          onClick={() => switchPage("knowYourRights")}
        />
      </div>
    </div>
  );
}

// ------------------ Prepare My Case ------------------
function PrepareMyCase({ goBack }) {
  const [step, setStep] = useState(1);

  // Step 1
  const [rent, setRent] = useState("");
  const [rentStatement, setRentStatement] = useState("");

  // Step 2
  const [household, setHousehold] = useState([]);
  const [householdNotes, setHouseholdNotes] = useState("");
  const toggleHousehold = (value) => {
    setHousehold((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Step 3
  const [incomeSources, setIncomeSources] = useState({
    wages: false,
    universalCredit: false,
    housingBenefits: false,
    childBenefit: false,
    pension: false,
    otherIncome: false,
  });
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [hasDebts, setHasDebts] = useState(false);
  const [debtDescription, setDebtDescription] = useState("");
  const handleIncomeSourceChange = (event) => {
    const { name, checked } = event.target;
    setIncomeSources({ ...incomeSources, [name]: checked });
  };

  // Step 4
  const [hasHealthCondition, setHasHealthCondition] = useState("");
  const [healthDetails, setHealthDetails] = useState("");
  const [affectsDailyLife, setAffectsDailyLife] = useState("");

  // Step 5
  const [hasDisrepair, setHasDisrepair] = useState("");
  const [issues, setIssues] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [landlordResponse, setLandlordResponse] = useState("");
  const toggleIssue = (value) => {
    setIssues((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  // Step 6
  const [extraInfo, setExtraInfo] = useState("");

  // PDF Generator
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Prepare My Case Report", 10, 10);
    doc.text(`Rent arrears: £${rent}`, 10, 20);
    doc.text(`Rent statement received: ${rentStatement}`, 10, 30);
    doc.text(`Household members: ${household.join(", ")}`, 10, 40);
    doc.text(`Household notes: ${householdNotes}`, 10, 50);
    doc.text(
      `Income sources: ${Object.keys(incomeSources)
        .filter((k) => incomeSources[k])
        .join(", ")}`,
      10,
      60
    );
    doc.text(`Monthly income: £${monthlyIncome}`, 10, 70);
    doc.text(`Debts: ${hasDebts ? debtDescription : "No"}`, 10, 80);
    doc.text(
      `Health conditions: ${hasHealthCondition === "yes" ? healthDetails : "No"}`,
      10,
      90
    );
    doc.text(`Affects daily life: ${affectsDailyLife}`, 10, 100);
    doc.text(`Disrepair: ${hasDisrepair}`, 10, 110);
    if (hasDisrepair === "yes") {
      doc.text(`Issues: ${issues.join(", ")}`, 10, 120);
      if (issues.includes("Other")) doc.text(`Other issues: ${otherText}`, 10, 130);
      doc.text(`Landlord response: ${landlordResponse}`, 10, 140);
    }
    doc.text(`Extra info: ${extraInfo}`, 10, 150);
    doc.save("PrepareMyCaseReport.pdf");
  };

  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h1 style={{ color: "black" }}>Prepare My Case</h1>

        {step === 1 && (
          <>
            <InputField label="Rent arrears (£)" value={rent} onChange={setRent} />
            <p style={{ color: "black" }}>Rent statement received?</p>
            <label>
              <input
                type="radio"
                name="rentStatement"
                value="yes"
                checked={rentStatement === "yes"}
                onChange={(e) => setRentStatement(e.target.value)}
              />{" "}
              Yes
            </label>
            <label style={{ marginLeft: 10 }}>
              <input
                type="radio"
                name="rentStatement"
                value="no"
                checked={rentStatement === "no"}
                onChange={(e) => setRentStatement(e.target.value)}
              />{" "}
              No
            </label>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <p style={{ color: "black" }}>Household members:</p>
            {["I live alone", "Partner", "Children", "Other adults"].map(
              (item) => (
                <label key={item} style={{ display: "block", color: "black" }}>
                  <input
                    type="checkbox"
                    checked={household.includes(item)}
                    onChange={() => toggleHousehold(item)}
                  />{" "}
                  {item}
                </label>
              )
            )}
            <textarea
              placeholder="List names/ages..."
              value={householdNotes}
              onChange={(e) => setHouseholdNotes(e.target.value)}
              style={{
                width: "100%",
                marginTop: 10,
                background: "#ADD8E6",
                color: "black",
              }}
            />
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <p style={{ color: "black" }}>Income sources:</p>
            {Object.keys(incomeSources).map((key) => (
              <label key={key} style={{ display: "block", color: "black" }}>
                <input
                  type="checkbox"
                  name={key}
                  checked={incomeSources[key]}
                  onChange={handleIncomeSourceChange}
                />{" "}
                {key}
              </label>
            ))}
            <InputField
              label="Monthly income (£)"
              value={monthlyIncome}
              onChange={setMonthlyIncome}
            />
            <p style={{ color: "black" }}>Any debts?</p>
            <label>
              <input
                type="radio"
                checked={hasDebts === true}
                onChange={() => setHasDebts(true)}
              />{" "}
              Yes
            </label>
            <label style={{ marginLeft: 10 }}>
              <input
                type="radio"
                checked={hasDebts === false}
                onChange={() => setHasDebts(false)}
              />{" "}
              No
            </label>
            {hasDebts && (
              <textarea
                placeholder="Describe debts"
                value={debtDescription}
                onChange={(e) => setDebtDescription(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: 10,
                  background: "#ADD8E6",
                  color: "black",
                }}
              />
            )}
          </>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <>
            <p style={{ color: "black" }}>Any health conditions?</p>
            <label>
              <input
                type="radio"
                name="health"
                value="yes"
                checked={hasHealthCondition === "yes"}
                onChange={(e) => setHasHealthCondition(e.target.value)}
              />{" "}
              Yes
            </label>
            <label style={{ marginLeft: 10 }}>
              <input
                type="radio"
                name="health"
                value="no"
                checked={hasHealthCondition === "no"}
                onChange={(e) => setHasHealthCondition(e.target.value)}
              />{" "}
              No
            </label>
            {hasHealthCondition === "yes" && (
              <textarea
                placeholder="Details"
                value={healthDetails}
                onChange={(e) => setHealthDetails(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: 10,
                  background: "#ADD8E6",
                  color: "black",
                }}
              />
            )}
            <p style={{ color: "black" }}>Affects daily life?</p>
            <label>
              <input
                type="radio"
                checked={affectsDailyLife === "yes"}
                onChange={() => setAffectsDailyLife("yes")}
              />{" "}
              Yes
            </label>
            <label style={{ marginLeft: 10 }}>
              <input
                type="radio"
                checked={affectsDailyLife === "no"}
                onChange={() => setAffectsDailyLife("no")}
              />{" "}
              No
            </label>
          </>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <>
            <p style={{ color: "black" }}>Any disrepair?</p>
            <label>
              <input
                type="radio"
                checked={hasDisrepair === "yes"}
                onChange={() => setHasDisrepair("yes")}
              />{" "}
              Yes
            </label>
            <label style={{ marginLeft: 10 }}>
              <input
                type="radio"
                checked={hasDisrepair === "no"}
                onChange={() => setHasDisrepair("no")}
              />{" "}
              No
            </label>
            {hasDisrepair === "yes" && (
              <>
                {[
                  "Damp/mould",
                  "Leaks",
                  "Broken heating",
                  "Pest infestation",
                  "Unsafe electrics",
                  "Other",
                ].map((issue) => (
                  <label key={issue} style={{ display: "block", color: "black" }}>
                    <input
                      type="checkbox"
                      checked={issues.includes(issue)}
                      onChange={() => toggleIssue(issue)}
                    />{" "}
                    {issue}
                  </label>
                ))}
                {issues.includes("Other") && (
                  <textarea
                    placeholder="Other issues"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    style={{
                      width: "100%",
                      marginTop: 10,
                      background: "#ADD8E6",
                      color: "black",
                    }}
                  />
                )}
                <p style={{ color: "black" }}>Landlord response:</p>
                <textarea
                  placeholder="Describe response"
                  value={landlordResponse}
                  onChange={(e) => setLandlordResponse(e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: 10,
                    background: "#ADD8E6",
                    color: "black",
                  }}
                />
              </>
            )}
          </>
        )}

        {/* Step 6 */}
        {step === 6 && (
          <>
            <p style={{ color: "black" }}>Extra information / notes:</p>
            <textarea
              placeholder="Any other info"
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              style={{
                width: "100%",
                marginTop: 10,
                background: "#ADD8E6",
                color: "black",
              }}
            />
          </>
        )}

        <div style={{ marginTop: 20 }}>
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{ ...buttonStyle, marginRight: 10 }}
            >
              Previous
            </button>
          )}
          {step < 6 && (
            <button onClick={() => setStep(step + 1)} style={buttonStyle}>
              Next
            </button>
          )}
          {step === 6 && (
            <button onClick={generatePDF} style={buttonStyle}>
              Generate PDF
            </button>
          )}
          <button onClick={goBack} style={{ ...buttonStyle, marginLeft: 10 }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

// ------------------ Know Your Rights ------------------
function KnowYourRights({ goBack }) {
  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h1 style={{ color: "black" }}>Know Your Rights</h1>

        <div style={{ textAlign: "left", marginTop: 20, lineHeight: 1.6, color: "black", fontSize: 16 }}>
          <h3>🏠 Tenant Rights</h3>
          <ul>
            <li>You must receive proper notice before eviction (Section 21 or Section 8 notices).</li>
            <li>You are entitled to live in a safe and habitable property.</li>
            <li>Your landlord cannot enter your home without proper notice, except in emergencies.</li>
          </ul>

          <h3>⚖️ Legal Protections</h3>
          <ul>
            <li>Housing law protects against unfair eviction and discrimination.</li>
            <li>You can challenge unlawful eviction notices in court.</li>
            <li>Legal aid may be available if you cannot afford a solicitor.</li>
          </ul>

          <h3>🛠️ Repairs</h3>
          <ul>
            <li>Your landlord is responsible for repairs that affect health and safety (e.g., heating, water, electricity).</li>
            <li>Report issues in writing and keep a record.</li>
          </ul>

          <h4>💡 Tips for Court or Tribunal</h4>
          <ul>
            <li>Collect all documents: tenancy agreement, rent statements, notices, correspondence.</li>
            <li>Keep a record of any communications with your landlord.</li>
            <li>Prepare a clear timeline of events if disputes arise.</li>
          </ul>

          <h3>📚 Resources</h3>
          <ul>
            <li>
              <a href="https://www.shelter.org.uk" target="_blank">Shelter UK</a>
            </li>
            <li>
              <a href="https://www.citizensadvice.org.uk" target="_blank">Citizens Advice</a>
            </li>
          <li>
            <a href="https://www.gov.uk/renting-out-a-property" target="_blank">Tenant Rights</a>
          </li>
          </ul>
        </div>

        <button style={{ ...buttonStyle, marginTop: 30 }} onClick={goBack}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

// ------------------ Support ------------------
function Support({ goBack }) {
  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h1 style={{ color: "black" }}>Support Resources</h1>
        <p style={{ color: "black", marginTop: 20, lineHeight: 1.8 }}>
          🏠 Local housing support<br />
          💰 Financial and debt advice<br />
          ⚖️ Legal aid contacts<br />
          🤝 Community support groups
        </p>
        <button onClick={goBack} style={{ ...buttonStyle, marginTop: 20 }}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

// ------------------ Shared Styles ------------------
const pageStyle = {
  background: "#ADD8E6",
  minHeight: "100vh",
  width: "100vw",
  padding: 20,
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
};

const formContainerStyle = {
  width: "100%",
  maxWidth: "600px",
  padding: 30,
  background: "#ADD8E6",
  borderRadius: 12,
};

const buttonStyle = {
  marginTop: 10,
  padding: "10px 20px",
  background: "#3182CE",
  color: "black",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 16,
};

const linkButtonStyle = {
  background: "none",
  border: "none",
  color: "black",
  textDecoration: "underline",
  cursor: "pointer",
  fontSize: 16,
};

const cardStyle = {
  background: "#ADD8E6",
  borderRadius: 12,
  padding: 20,
  textAlign: "center",
};

const iconStyle = {
  fontSize: 40,
  marginBottom: 12,
};

const dashboardStyle = {
  fontFamily: "sans-serif",
  background: "#ADD8E6",
  minHeight: "100vh",
  width: "100vw",
};

const navStyle = {
  background: "#3182CE",
  padding: "16px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
  color: "black",
};

const desktopNavLinksStyle = {
  display: "flex",
  gap: "15px",
};

const navButtonStyle = {
  background: "none",
  border: "none",
  color: "black",
  cursor: "pointer",
  fontSize: 16,
  padding: "5px 10px",
};

const hamburgerButtonStyle = {
  fontSize: 24,
  color: "black",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const mobileMenuStyle = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "60px",
  right: "20px",
  background: "#3182CE",
  padding: 15,
  borderRadius: 8,
  zIndex: 10,
};

const dashboardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  padding: 20,
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  boxSizing: "border-box",
};

// ------------------ Main App ------------------
export default function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" && (
        <Login
          switchToSignup={() => setPage("signup")}
          onLoginSuccess={() => setPage("aboutIntro")}
        />
      )}

      {page === "signup" && <Signup switchToLogin={() => setPage("login")} />}
      {page === "aboutIntro" && <AboutIntro goNext={() => setPage("legalAid")} />}
      {page === "legalAid" && <LegalAidCheck goNext={() => setPage("dashboard")} />}
      {page === "dashboard" && <Dashboard switchPage={setPage} />}
      {page === "aboutDashboard" && <About goBack={() => setPage("dashboard")} />}
      {page === "knowYourRights" && <KnowYourRights goBack={() => setPage("dashboard")} />}
      {page === "prepareCase" && <PrepareMyCase goBack={() => setPage("dashboard")} />}
      {page === "support" && <Support goBack={() => setPage("dashboard")} />}
    </>
  );
}
