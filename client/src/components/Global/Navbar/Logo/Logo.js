import "./Logo.css";

export const Logo = () => {
  return (
    <div className="Logo flex row">
      <ul className="flex row">
        <li style={{ animationDelay: "0s" }}>O</li>
        <li style={{ animationDelay: "0.3s" }}>U</li>
        <li style={{ animationDelay: "0.6s" }}>R</li>
        <span>-</span>
        <li style={{ animationDelay: "0.9s" }}>A</li>
        <li style={{ animationDelay: "1.2s" }}>P</li>
        <li style={{ animationDelay: "1.5s" }}>P</li>
      </ul>
    </div>
  );
};
