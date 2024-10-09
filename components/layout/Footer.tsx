import React from "react";

interface FooterProps {
  emailSubscriptionText?: string;
  sections: {
    title: string;
    links: { name: string; href: string }[];
  }[];
  socialLinks: {
    icon: JSX.Element;
    href: string;
  }[];
  copyrightText: string;
  termsLink: string;
  privacyPolicyLink: string;
}

const Footer: React.FC<FooterProps> = ({
  emailSubscriptionText = "Enter your email to get notified by AfriCanvas for latest updates.",
  sections,
  socialLinks,
  copyrightText,
  termsLink,
  privacyPolicyLink,
}) => {
  return (
    <footer className="bg-gradient-to-r from-black via-black to-purple-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-white">BreachWatchers</h2>
            <p className="mt-4 text-gray-400">{emailSubscriptionText}</p>
            <div className="mt-6 flex space-x-4">
              {socialLinks &&
                socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-400 hover:text-white"
                  >
                    {link.icon}
                  </a>
                ))}
            </div>
            <div className="mt-6 relative max-w-md">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-gray-800 text-white p-4 pr-16 rounded-full focus:outline-none focus:ring focus:border-purple-500 w-full"
              />
              <button className="absolute inset-y-3 inset-x-30 right-4 bg-purple-600 px-2 py-2 rounded-full hover:bg-purple-700 flex items-center justify-center size">
                <span className="text-white text-xl">→</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-between md:space-x-16 space-y-8 md:space-y-0 md:flex-nowrap">
            {sections &&
              sections.map((section) => (
                <div key={section.title} className="text-sm">
                  <h3 className="text-lg font-semibold text-white">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-white"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center md:text-left">
          <div className="flex justify-between items-center flex-col md:flex-row">
            <div className="space-x-6 text-sm">
              <a href={termsLink} className="text-gray-400 hover:text-white">
                Terms
              </a>
              <a
                href={privacyPolicyLink}
                className="text-gray-400 hover:text-white"
              >
                Privacy Policy
              </a>
            </div>
            <p className="mt-4 md:mt-0 text-gray-400 text-sm">
              {copyrightText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
