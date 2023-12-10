const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>Gadget Scorpio &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;
