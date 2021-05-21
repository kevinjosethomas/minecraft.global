const DropdownAnimation = {
  initial: { height: 0 },
  animate: { height: "auto", transition: { type: "spring", duration: 0.3 } },
  exit: { height: 0, transition: { duration: 0.3 } },
};

export { DropdownAnimation };
