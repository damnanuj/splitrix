# Skeleton Loaders

This folder contains animated skeleton loaders for the FriendsGroup feature.

## Components

### `FriendsListSkeleton`

Animated skeleton loader for the friends list component. Shows placeholder content while friends data is loading.

**Usage:**

```tsx
import { FriendsListSkeleton } from "./skeleton";

// Use when loading friends
if (isLoading && friends.length === 0) {
  return <FriendsListSkeleton />;
}
```

### `AddNewFriendSkeleton`

Animated skeleton loader for the add new friend page. Shows placeholder content while users data is loading.

**Usage:**

```tsx
import { AddNewFriendSkeleton } from "./skeleton";

// Use when loading users
if (isLoading) {
  return <AddNewFriendSkeleton />;
}
```

### `ShimmerSkeleton`

Reusable shimmer skeleton component with customizable dimensions and animation.

**Props:**

- `width?: number | string` - Width of the skeleton (default: "100%")
- `height?: number` - Height of the skeleton (default: 20)
- `borderRadius?: number` - Border radius of the skeleton (default: 4)
- `delay?: number` - Animation delay in milliseconds (default: 0)

**Usage:**

```tsx
import { ShimmerSkeleton } from "./skeleton";

<ShimmerSkeleton width={60} height={60} borderRadius={10} delay={100} />;
```

## Features

- **Smooth Animations**: Uses React Native's Animated API for smooth shimmer effects
- **Staggered Animation**: Each skeleton item has a slight delay for a wave-like effect
- **Customizable**: Easy to customize dimensions, colors, and animation timing
- **Performance Optimized**: Uses native driver for smooth 60fps animations
- **Accessible**: Proper loading states for screen readers

## Animation Details

- **Duration**: 1.5 seconds per cycle
- **Effect**: Shimmer wave that moves from left to right
- **Opacity Range**: 0.3 to 0.8 for subtle shimmer effect
- **Stagger Delay**: 100ms between each skeleton item

