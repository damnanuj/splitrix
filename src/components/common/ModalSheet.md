# ModalSheet Component

A highly flexible and reusable modal sheet component built with Tamagui's Sheet component. Perfect for various UI patterns like notifications, forms, action sheets, and drawers.

## Features

- 🎯 **Highly Customizable**: Configure snap points, animations, styling, and behavior
- 📱 **Multiple Use Cases**: Perfect for notifications, forms, action sheets, drawers
- 🎨 **Flexible Styling**: Customize padding, gaps, overlay, and animations
- 🔧 **Type Safe**: Full TypeScript support with proper type definitions
- ⚡ **Performance**: Optimized with proper memoization and animations

## Basic Usage

```tsx
import { ModalSheet } from "src/components/common/ModalSheet";

const [open, setOpen] = useState(false);

<ModalSheet open={open} onOpenChange={setOpen}>
  <MyText>Your content here</MyText>
</ModalSheet>;
```

## Props

| Prop                    | Type                                                  | Default      | Description                       |
| ----------------------- | ----------------------------------------------------- | ------------ | --------------------------------- |
| `open`                  | `boolean`                                             | -            | Controls sheet visibility         |
| `onOpenChange`          | `(open: boolean) => void`                             | -            | Callback when sheet state changes |
| `children`              | `React.ReactNode`                                     | -            | Sheet content                     |
| `snapPoints`            | `(number \| string)[]`                                | `[85]`       | Snap points for sheet positions   |
| `snapPointsMode`        | `"percent" \| "constant" \| "fit" \| "mixed"`         | `"percent"`  | How snap points are interpreted   |
| `dismissOnSnapToBottom` | `boolean`                                             | `true`       | Dismiss when swiped to bottom     |
| `modal`                 | `boolean`                                             | `true`       | Whether sheet is modal or inline  |
| `animation`             | `"quick" \| "medium" \| "slow" \| "bouncy" \| "lazy"` | `"medium"`   | Sheet animation                   |
| `padding`               | `SizeTokens`                                          | `"$4"`       | Internal padding                  |
| `gap`                   | `SizeTokens`                                          | `"$4"`       | Gap between children              |
| `overlayBg`             | `any`                                                 | `"$shadow6"` | Overlay background color          |
| `overlayAnimation`      | `"quick" \| "medium" \| "slow" \| "bouncy" \| "lazy"` | `"lazy"`     | Overlay animation                 |
| `showHandle`            | `boolean`                                             | `true`       | Show drag handle                  |
| `zIndex`                | `number`                                              | `100_000`    | Z-index of the sheet              |

## Usage Examples

### 1. Notification Sheet (Default)

```tsx
<ModalSheet open={open} onOpenChange={setOpen}>
  <MyText>Group Invitation</MyText>
  <MyText>You've been invited to join a group</MyText>
</ModalSheet>
```

### 2. Form Sheet (Full Screen)

```tsx
<ModalSheet
  open={open}
  onOpenChange={setOpen}
  snapPoints={[95]}
  padding="$6"
  gap="$6"
>
  <MyText fontSize="$6">Create New Group</MyText>
  {/* Form content */}
</ModalSheet>
```

### 3. Action Sheet (Multiple Snap Points)

```tsx
<ModalSheet
  open={open}
  onOpenChange={setOpen}
  snapPoints={[50, 25]}
  snapPointsMode="percent"
  animation="quick"
  padding="$3"
  gap="$3"
>
  <MyText>Quick Actions</MyText>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</ModalSheet>
```

### 4. Bottom Drawer

```tsx
<ModalSheet
  open={open}
  onOpenChange={setOpen}
  snapPoints={[300, 150]}
  snapPointsMode="constant"
  showHandle={false}
  padding="$5"
  gap="$4"
  overlayBg="$shadow3"
>
  <MyText>Drawer Content</MyText>
</ModalSheet>
```

### 5. Inline Sheet (Non-Modal)

```tsx
<ModalSheet
  open={open}
  onOpenChange={setOpen}
  modal={false}
  snapPoints={[200]}
  snapPointsMode="constant"
  animation="bouncy"
  zIndex={50}
>
  <MyText>Inline Content</MyText>
</ModalSheet>
```

### 6. Custom Styled Sheet

```tsx
<ModalSheet
  open={open}
  onOpenChange={setOpen}
  snapPoints={[80, 40]}
  snapPointsMode="percent"
  animation="slow"
  padding="$8"
  gap="$6"
  overlayBg="$red3"
  overlayAnimation="medium"
  zIndex={200_000}
>
  <MyText color="$red10">Custom Styled Sheet</MyText>
</ModalSheet>
```

## Snap Points Modes

### Percent Mode

```tsx
snapPoints={[85, 50, 25]} // 85%, 50%, 25% of screen height
snapPointsMode="percent"
```

### Constant Mode

```tsx
snapPoints={[300, 150]} // 300px, 150px from bottom
snapPointsMode="constant"
```

### Fit Mode

```tsx
snapPoints = { undefined }; // Fits content height
snapPointsMode = "fit";
```

### Mixed Mode

```tsx
snapPoints={["fit", 200, "50%"]} // Mix of fit, constant, and percent
snapPointsMode="mixed"
```

## Common Patterns

### Notification Sheet

```tsx
<ModalSheet open={open} onOpenChange={setOpen}>
  <MyText fontSize="$6">Notification Title</MyText>
  <MyText>Notification message</MyText>
</ModalSheet>
```

### Form Sheet

```tsx
<ModalSheet
  open={open}
  onOpenChange={setOpen}
  snapPoints={[95]}
  padding="$6"
  gap="$6"
>
  <MyText fontSize="$6">Form Title</MyText>
  {/* Form fields */}
</ModalSheet>
```

### Quick Actions

```tsx
<ModalSheet
  open={open}
  onOpenChange={setOpen}
  snapPoints={[50, 25]}
  animation="quick"
>
  <MyText>Quick Actions</MyText>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</ModalSheet>
```

## Best Practices

1. **Use appropriate snap points** for your content
2. **Choose the right animation** for the use case
3. **Consider modal vs inline** based on context
4. **Use proper z-index** for layering
5. **Test on different screen sizes** with your snap points

## Migration from UniversalSheet

The new ModalSheet is a simplified, more flexible version of the UniversalSheet:

- ✅ **Simpler API**: Fewer props, clearer defaults
- ✅ **Better TypeScript**: Proper type definitions
- ✅ **More Flexible**: Easy to customize for different use cases
- ✅ **Better Performance**: Optimized for common patterns
