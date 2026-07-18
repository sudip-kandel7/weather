const Footer = () => {
  return (
    <footer className="mt-10 bg-blue-600 p-4 text-center text-white">
      <p className="text-lg">
        Made by {" "}
        <span className="font-semibold">
          Sudip Kandel
        </span>
      </p>

      <p className="mt-2 text-sm text-blue-100">
        © {new Date().getFullYear()} Paade. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;