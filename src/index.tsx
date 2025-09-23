import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { WebAgent } from "./examples/web-app";
import { MakePhoneCall } from "./examples/make-phone-call";
import { useState } from "react";
import { Globe2, Mic, Phone, PhoneCall, Sparkles, Volume2 } from "lucide-react";

function App() {
  const [activeComponent, setActiveComponent] = useState("Web Voice");

  const menuItems = [
    {
      id: "Web Voice",
      label: "Adding voice agent in web",
      icon: <Globe2 className="w-4 h-4" />,
      component: "Web Voice",
    },
    {
      id: "Phone Call",
      icon: <PhoneCall className="w-4 h-4" />,
      label: "Intiating a phone call",
      component: "Phone Call",
    },
  ];

  return (
    <div className="flex h-screen bg-white dark:bg-gray-950 font-sans">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="py-3 px-3 border-b border-gray-300 dark:border-gray-800">
          <h1 className="text-base text-gray-500 dark:text-gray-200">
            Examples
          </h1>
        </div>

        {/* Navigation */}
        <nav className="">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveComponent(item.component)}
                  className={`
                    w-full px-4 py-2 transition-colors flex gap-3 items-center
                    ${
                      activeComponent === item.component
                        ? "bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {activeComponent === "Web Voice" && <WebAgent />}
        {activeComponent === "Phone Call" && <MakePhoneCall />}
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
