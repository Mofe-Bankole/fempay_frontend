import React, { useState } from "react";
import { View, TextInput } from "react-native";
import type { StyleProp, ViewStyle, TextInputProps } from "react-native";

const RING = "#7C3AED";
const REST_BORDER = "rgba(0,0,0,0.3)";

export type FocusProps = { onFocus: () => void; onBlur: () => void };

/**
 * App-wide focus treatment for input fields.
 *  - rest:  inner 1px border @ black/30, no visible outer ring
 *  - focus: inner 1px border @ #7C3AED plus a 2px #7C3AED ring offset a few px
 *           outside the field ("enveloping" it)
 *
 * The ring's space is always reserved (transparent on rest) so focusing never
 * shifts layout. Borders/radius live on these wrapper Views, so the field passed
 * in `children` should carry NO border/rounded classes of its own.
 *
 * `children` is a render prop receiving focus handlers to spread onto the input.
 */
export function FocusField({
  className,
  containerClassName,
  radius = 16,
  gap = 4,
  innerStyle,
  containerStyle,
  children,
}: {
  className?: string;
  containerClassName?: string;
  radius?: number;
  gap?: number;
  innerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  children: (focusProps: FocusProps) => React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  const focusProps: FocusProps = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };
  return (
    <View
      className={containerClassName}
      style={[
        {
          borderWidth: 2,
          borderColor: focused ? RING : "transparent",
          borderRadius: radius + gap,
          padding: gap,
        },
        containerStyle,
      ]}
    >
      <View
        className={className}
        style={[
          {
            borderWidth: 1,
            borderColor: focused ? RING : REST_BORDER,
            borderRadius: radius,
          },
          innerStyle,
        ]}
      >
        {children(focusProps)}
      </View>
    </View>
  );
}

/**
 * Drop-in single TextInput carrying the app-wide focus treatment.
 *  - containerClassName: layout classes for the outer ring wrapper (margins, etc.)
 *  - fieldClassName:     bg / padding / flex classes for the field box (NO border/rounded)
 *  - className:          text styling passed straight to the TextInput
 */
export function AppTextInput({
  containerClassName,
  fieldClassName,
  radius,
  gap,
  className,
  ...rest
}: TextInputProps & {
  containerClassName?: string;
  fieldClassName?: string;
  radius?: number;
  gap?: number;
}) {
  return (
    <FocusField
      containerClassName={containerClassName}
      className={fieldClassName}
      radius={radius}
      gap={gap}
    >
      {(fp) => <TextInput className={className} {...rest} {...fp} />}
    </FocusField>
  );
}
