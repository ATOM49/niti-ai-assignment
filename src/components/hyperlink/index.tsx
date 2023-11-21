import LinkElement from "@/models/link_element";
import React from "react";

const Hyperlink = React.forwardRef<HTMLAnchorElement, LinkElement>(
  ({ label, href, styleProperties }, ref) => {
    return (
      <a
        ref={ref}
        className={`text-blue-500 hover:text-blue-700 font-bold`}
        href={href}
        style={styleProperties}
      >
        {label}
      </a>
    );
  }
);

export default Hyperlink;
