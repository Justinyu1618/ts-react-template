import React, { MouseEvent } from "react";
import classnames from "classnames";

import "./Layout.css";

const spacingProps = [
  "margin",
  "marginLeft",
  "marginTop",
  "marginBottom",
  "marginRight",
  "padding",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "paddingBottom",
  "borderRadius",
  "gap",
];

export interface PositionProps {
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  bottom?: string;
  top?: string;
  left?: string;
  right?: string;
}

// In the future, we can have a set of Gather specific colors.
interface StyleProps {
  color?: string;
  backgroundColor?: string;
  zIndex?: number;
  overflow?: "auto" | "scroll" | "visible" | "hidden";
  cursor?: "default" | "pointer" | "text";
  textAlign?: "right" | "left" | "center" | "justify";
  opacity?: number;
  border?: string;
}

export interface SizeProps {
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  borderRadius?: number | string;
}

export interface MarginProps {
  margin?: "auto" | number;
  marginLeft?: "auto" | number;
  marginTop?: "auto" | number;
  marginBottom?: "auto" | number;
  marginRight?: "auto" | number;
  marginX?: "auto" | number;
  marginY?: "auto" | number;
}

interface PaddingProps {
  padding?: number;
  paddingLeft?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingRight?: number;
  paddingX?: number;
  paddingY?: number;
}

interface FlexProps {
  display?: "flex" | "block" | "none" | "inline-flex" | "inline-block" | "grid";
  flexDirection?: "row" | "column";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "initial"
    | "inherit";
  alignItems?:
    | "stretch"
    | "center"
    | "flex-start"
    | "flex-end"
    | "baseline"
    | "initial"
    | "inherit";
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  flexGrow?: number;
  flexShrink?: number;
  flex?: string;
  gap?: number;
}

export interface CenterProps {
  centerX?: boolean;
  centerY?: boolean;
}

interface LayoutProps
  extends FlexProps,
    MarginProps,
    PaddingProps,
    SizeProps,
    StyleProps,
    PositionProps,
    CenterProps {}

export interface Props extends LayoutProps {
  // Lint warning auto-ignored when enabling the no-explicit-any rule. Fix this the next time this code is edited! TODO: @ENG-4294 Clean these up! See the linear task for guidance on how to do so.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onScroll?: React.HTMLAttributes<HTMLDivElement>["onScroll"];
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  tabIndex?: number;
  role?: React.AriaRole;
}

export const SPACING_SCALE = 4;
export const scale = (n: number): string => {
  return `${n * SPACING_SCALE}px`;
};

const Layout = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    display = "flex",
    children,
    className,
    onClick,
    onContextMenu,
    onMouseDown,
    onKeyDown,
    onScroll,
    centerX,
    centerY,
    role,
  } = props;

  //  TODO: Filter out non-styles.
  // Lint warning auto-ignored when enabling the no-explicit-any rule. Fix this the next time this code is edited! TODO: @ENG-4294 Clean these up! See the linear task for guidance on how to do so.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const styles: any = {};
  Object.entries(props).forEach(([name, value]) => {
    if (value != null) {
      styles[name] = value;
    }
  });

  if (props.marginX) {
    styles.marginLeft = props.marginX;
    styles.marginRight = props.marginX;
  }

  if (props.marginY) {
    styles.marginTop = props.marginY;
    styles.marginBottom = props.marginY;
  }

  if (props.paddingX) {
    styles.paddingLeft = props.paddingX;
    styles.paddingRight = props.paddingX;
  }

  if (props.paddingY) {
    styles.paddingTop = props.paddingY;
    styles.paddingBottom = props.paddingY;
  }

  if (props.border) {
    styles.border = props.border;
  }

  // Resolve linear space system.
  spacingProps.forEach((name) => {
    if (styles.hasOwnProperty(name) && typeof styles[name] === "number") {
      styles[name] = scale(styles[name]);
    }
  });

  return (
    <div
      className={classnames("Layout", className, {
        "center-x": centerX,
        "center-y": centerY,
      })}
      style={{
        display,
        ...styles,
      }}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
      onKeyDown={onKeyDown}
      onScroll={onScroll}
      ref={ref}
      tabIndex={props.tabIndex}
      role={role}
    >
      {children}
    </div>
  );
});

Layout.displayName = "Layout";

export default Layout;
