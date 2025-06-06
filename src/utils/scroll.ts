export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const navHeight = 80; // Approximate navbar height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};