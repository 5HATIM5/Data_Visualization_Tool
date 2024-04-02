import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Navigation links
const navigation = [
  { name: "Home", href: "/", target: "_self" },
  { name: "Features", href: "/features", target: "_self" },
  {
    name: "Charts",
    href: "https://www.chartjs.org/docs/latest/",
    target: "_blank",
  },
  { name: "About", href: "/about", target: "_self" },
];

/**
 * Navbar component for the application.
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State to manage mobile menu visibility
  const [show, handleShow] = useState(false); // State to manage navbar visibility on scroll

  // Effect to handle navbar visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      handleShow(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`inset-x-0 top-0 z-50 fixed transition-timing-function-ease-in transition-all duration-500 ${
        show && "bg-gray-50"
      }`}
    >
      <nav
        className="flex items-center justify-between p-6 lg:px-8 lg:ml-36 lg:mr-36"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/BMW_Group.svg/1280px-BMW_Group.svg.png"
              alt=""
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              target={item.target}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="https://www.linkedin.com/in/5hatim5/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Contact <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      {/* Mobile menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/BMW_Group.svg/1280px-BMW_Group.svg.png"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {/* Navigation links */}
              <div className="space-y-2 py-6">
                {navigation.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    target={item.target}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {/* Contact link */}
              <div className="py-6">
                <Link
                  to="https://www.linkedin.com/in/5hatim5/"
                  target="_blank"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Contact <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
