import React from "react";

export type NavLinkProps = {
  title: string;
  icon: React.ElementType;
  iconSize: number;
  href: string;
};

export type TabFilterProps = {
  filters: string[];
  paramKey: string;
  fallback: string;
  replace?: boolean;
};
