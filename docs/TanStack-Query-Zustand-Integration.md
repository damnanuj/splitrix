# TanStack Query + Zustand Integration Guide

This guide explains how to implement TanStack Query with Zustand for optimal caching and state management in your React Native app.

## Overview

The pattern combines:

- **TanStack Query**: Handles server state, caching, background updates, and data fetching
- **Zustand**: Manages client state for instant UI updates and local state management

## Benefits

1. **Automatic Caching**: Data is cached and reused across components
2. **Background Updates**: Data stays fresh with automatic refetching
3. **Instant UI Updates**: Zustand provides immediate state updates
4. **Reduced API Calls**: Cached data prevents unnecessary network requests
5. **Better UX**: No loading states on subsequent visits (until cache expires)
6. **Optimistic Updates**: UI responds immediately, then syncs with server
7. **Smart Cache Management**: Different stale times for different data types

## Implementation Steps

### 1. Setup TanStack Query Client (Already Done)

The QueryClient is already configured in `app/Provider.tsx` with optimal defaults:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

**Global Defaults:**

- 5-minute stale time
- 10-minute garbage collection time
- 1 retry attempt
- No refetch on window focus

### 2. Create Query Hooks

Create a new file `src/hooks/use[Feature]Queries.ts`:

```typescript
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { get[Feature]Data } from "src/services/[feature].service";
import { use[Feature]Store } from "src/stores/[feature]Store";
import apiService from "src/services/api.service";
import { API_ENDPOINTS } from "src/config/api.config";

// Query keys for consistent caching
export const [feature]Keys = {
  all: ["[feature]"] as const,
  lists: () => [...[feature]Keys.all, "list"] as const,
  list: (filters: Record<string, any>) => [...[feature]Keys.lists(), { filters }] as const,
  // Add more specific keys as needed
};

// Custom hook for [feature] data
export const use[Feature] = () => {
  const queryClient = useQueryClient();
  const { set[Feature]Data, setError, clearError } = use[Feature]Store();

  return useQuery({
    queryKey: [feature]Keys.lists(),
    queryFn: async () => {
      try {
        const response = await get[Feature]Data();

        if (response.success) {
          // Update Zustand store for instant UI updates
          set[Feature]Data(response.data);
          clearError();
          return response.data;
        } else {
          throw new Error(response.msg || "Failed to fetch [feature] data");
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.msg || error.message || "Failed to fetch [feature] data";
        setError(errorMessage);
        throw error;
      }
    },
    // Use global defaults (staleTime: 5 min, gcTime: 10 min, retry: 1)
  });
};

// Custom hook for specific data (e.g., unread count)
export const use[Feature]Count = (options?: { enabled?: boolean }) => {
  const { set[Feature]Count } = use[Feature]Store();

  return useQuery({
    queryKey: [feature]Keys.count(),
    queryFn: async () => {
      try {
        const response = await get[Feature]Count();

        if (response.success) {
          set[Feature]Count(response.data.count);
          return response.data;
        } else {
          throw new Error(response.msg || "Failed to fetch [feature] count");
        }
      } catch (error: any) {
        throw error;
      }
    },
    // Override staleTime for more frequent updates
    staleTime: 2 * 60 * 1000, // 2 minutes (more frequent than global 5 min)
    enabled: options?.enabled ?? true,
  });
};

// Mutation hook for updating data
export const useUpdate[Feature] = () => {
  const queryClient = useQueryClient();
  const { update[Feature]Data } = use[Feature]Store();

  return useMutation({
    mutationFn: async (data: UpdateData) => {
      const response = await apiService.put(`/api/[feature]/${data.id}`, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update local state immediately for instant UI update
      update[Feature]Data(prevData =>
        prevData.map(item =>
          item.id === variables.id ? { ...item, ...data } : item
        )
      );

      // Invalidate cache to ensure consistency
      queryClient.invalidateQueries({ queryKey: [feature]Keys.lists() });
    },
    onError: (error) => {
      console.error("Failed to update [feature]:", error);
    },
  });
};

// Utility function to invalidate cache
export const useInvalidate[Feature] = () => {
  const queryClient = useQueryClient();

  return {
    invalidate[Feature]: () => {
      queryClient.invalidateQueries({ queryKey: [feature]Keys.lists() });
    },
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: [feature]Keys.all });
    },
  };
};
```

### 3. Update Zustand Store

Modify your store to work as a state container:

```typescript
import { create } from "zustand";
import { [Feature]State } from "./types";

export const use[Feature]Store = create<[Feature]State>((set, get) => ({
  data: [],
  count: 0,
  isLoading: false,
  error: null,

  // New methods for TanStack Query integration
  set[Feature]Data: (data) => {
    set({ data });
  },

  update[Feature]Data: (updater) => {
    set((state) => ({ data: updater(state.data) }));
  },

  set[Feature]Count: (count) => {
    set({ count });
  },

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  // Legacy methods for backward compatibility
  fetch[Feature]: async () => {
    console.warn("fetch[Feature] is deprecated. Use use[Feature] hook instead.");
  },
}));
```

### 4. Update Types

Add new methods to your store interface:

```typescript
export interface [Feature]State {
  data: [DataType][];
  count: number;
  isLoading: boolean;
  error: string | null;
  // New methods for TanStack Query integration
  set[Feature]Data: (data: [DataType][]) => void;
  update[Feature]Data: (updater: (data: [DataType][]) => [DataType][]) => void;
  set[Feature]Count: (count: number) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  // Legacy methods for backward compatibility
  fetch[Feature]: () => Promise<void>;
}
```

### 5. Update Components

Replace direct store usage with query hooks:

```typescript
// Before
const { data, isLoading, error, fetchData } = use[Feature]Store();

useEffect(() => {
  fetchData();
}, []);

// After
const { data, error, clearError } = use[Feature]Store();
const { data: queryData, isLoading, error: queryError, refetch } = use[Feature]();

// Use error from either Zustand store or TanStack Query
const displayError = error || queryError?.message;
```

### 6. App-Level Data Fetching

For global data that needs to be fetched when the app loads:

```typescript
// In app/_layout.tsx
import { use[Feature]Count } from "src/hooks/use[Feature]Queries";

const RootLayout = () => {
  const { authData, isLoading } = useAuthStore();

  // Only fetch when user is authenticated
  use[Feature]Count({
    enabled: !!authData && !isLoading,
  });

  // Rest of your component...
};
```

## 🚀 **Complete Step-by-Step Guide for New Features**

### **Step 1: Create the Service Function**

```typescript
// src/services/friends.service.ts
import apiService from "./api.service";
import { API_ENDPOINTS } from "src/config/api.config";

export const getFriends = async () => {
  const response = await apiService.get(API_ENDPOINTS.user.friendsList);
  return response.data;
};

export const getFriendsCount = async () => {
  const response = await apiService.get(API_ENDPOINTS.user.friendsCount);
  return response.data;
};
```

### **Step 2: Create Query Hooks**

```typescript
// src/hooks/useFriendsQueries.ts
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getFriends, getFriendsCount } from "src/services/friends.service";
import { useFriendsStore } from "src/stores/friendsStore";
import apiService from "src/services/api.service";
import { API_ENDPOINTS } from "src/config/api.config";

export const friendsKeys = {
  all: ["friends"] as const,
  lists: () => [...friendsKeys.all, "list"] as const,
  count: () => [...friendsKeys.all, "count"] as const,
};

export const useFriends = () => {
  const { setFriends, setError, clearError } = useFriendsStore();

  return useQuery({
    queryKey: friendsKeys.lists(),
    queryFn: async () => {
      try {
        const response = await getFriends();
        if (response.success) {
          setFriends(response.data);
          clearError();
          return response.data;
        } else {
          throw new Error(response.msg || "Failed to fetch friends");
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.msg ||
          error.message ||
          "Failed to fetch friends";
        setError(errorMessage);
        throw error;
      }
    },
    // Uses global defaults (5 min stale, 10 min gc, 1 retry)
  });
};

export const useFriendsCount = (options?: { enabled?: boolean }) => {
  const { setFriendsCount } = useFriendsStore();

  return useQuery({
    queryKey: friendsKeys.count(),
    queryFn: async () => {
      try {
        const response = await getFriendsCount();
        if (response.success) {
          setFriendsCount(response.data.count);
          return response.data;
        } else {
          throw new Error(response.msg || "Failed to fetch friends count");
        }
      } catch (error: any) {
        throw error;
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes (more frequent updates)
    enabled: options?.enabled ?? true,
  });
};

export const useAddFriend = () => {
  const queryClient = useQueryClient();
  const { addFriend } = useFriendsStore();

  return useMutation({
    mutationFn: async (friendData: any) => {
      const response = await apiService.post(
        API_ENDPOINTS.user.addFriend,
        friendData
      );
      return response.data;
    },
    onSuccess: (data) => {
      addFriend(data.friend);
      queryClient.invalidateQueries({ queryKey: friendsKeys.lists() });
    },
    onError: (error) => {
      console.error("Failed to add friend:", error);
    },
  });
};
```

### **Step 3: Update the Store**

```typescript
// src/stores/friendsStore.ts
import { create } from "zustand";
import { FriendsState } from "./types";

export const useFriendsStore = create<FriendsState>((set, get) => ({
  friends: [],
  friendsCount: 0,
  isLoading: false,
  error: null,

  setFriends: (friends) => {
    set({ friends });
  },

  updateFriends: (updater) => {
    set((state) => ({ friends: updater(state.friends) }));
  },

  setFriendsCount: (count) => {
    set({ friendsCount: count });
  },

  addFriend: (friend) => {
    set((state) => ({ friends: [...state.friends, friend] }));
  },

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  // Legacy methods
  fetchFriends: async () => {
    console.warn("fetchFriends is deprecated. Use useFriends hook instead.");
  },
}));
```

### **Step 4: Update Types**

```typescript
// src/stores/types.ts
export interface FriendsState {
  friends: Friend[];
  friendsCount: number;
  isLoading: boolean;
  error: string | null;
  setFriends: (friends: Friend[]) => void;
  updateFriends: (updater: (friends: Friend[]) => Friend[]) => void;
  setFriendsCount: (count: number) => void;
  addFriend: (friend: Friend) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  fetchFriends: () => Promise<void>;
}
```

### **Step 5: Use in Components**

```typescript
// src/features/Friends/FriendsList.tsx
import { useFriendsStore } from "src/stores/friendsStore";
import { useFriends } from "src/hooks/useFriendsQueries";

const FriendsList = () => {
  const { friends, error, clearError } = useFriendsStore();
  const { data, isLoading, error: queryError, refetch } = useFriends();

  const displayError = error || queryError?.message;

  if (isLoading) return <Loader />;
  if (displayError) return <ErrorComponent onRetry={refetch} />;

  return (
    <div>
      {friends.map((friend) => (
        <FriendItem key={friend._id} friend={friend} />
      ))}
    </div>
  );
};
```

### **Step 6: App-Level Fetching (Optional)**

```typescript
// app/_layout.tsx
import { useFriendsCount } from "src/hooks/useFriendsQueries";

const RootLayout = () => {
  const { authData, isLoading } = useAuthStore();

  // Fetch friends count when user is authenticated
  useFriendsCount({
    enabled: !!authData && !isLoading,
  });

  // Rest of component...
};
```

## 📋 **Quick Reference Checklist**

When implementing a new feature, follow this checklist:

- [ ] **1. Create service functions** in `src/services/[feature].service.ts`
- [ ] **2. Create query hooks** in `src/hooks/use[Feature]Queries.ts`
- [ ] **3. Update Zustand store** with new methods
- [ ] **4. Update TypeScript types** for the store
- [ ] **5. Update components** to use new hooks
- [ ] **6. Add app-level fetching** if needed (optional)

## 🎯 **Key Patterns to Remember**

### **For GET APIs (Queries):**

```typescript
// Use global defaults
return useQuery({ queryKey, queryFn });

// Override staleTime for frequent updates
return useQuery({ queryKey, queryFn, staleTime: 2 * 60 * 1000 });
```

### **For PUT/POST/DELETE APIs (Mutations):**

```typescript
return useMutation({
  mutationFn: async (data) => { /* API call */ },
  onSuccess: (data, variables) => {
    // Update store immediately
    updateStore(prevData => /* update logic */);
    // Invalidate cache
    queryClient.invalidateQueries({ queryKey });
  },
});
```

### **For App-Level Data:**

```typescript
// In _layout.tsx
use[Feature]Count({ enabled: !!authData && !isLoading });
```

### **For Components:**

```typescript
// Read from store for instant updates
const { data } = use[Feature]Store();
// Use query hook for loading states
const { isLoading, error, refetch } = use[Feature]();
```

## Handling PUT/POST/DELETE APIs with Mutations

For APIs that modify data (PUT, POST, DELETE), use TanStack Query mutations:

### 1. Create Mutation Hooks

```typescript
// Mutation hook for updating data
export const useUpdate[Feature] = () => {
  const queryClient = useQueryClient();
  const { update[Feature]Data } = use[Feature]Store();

  return useMutation({
    mutationFn: async (data: UpdateData) => {
      const response = await apiService.put(`/api/[feature]/${data.id}`, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update local state immediately for instant UI update
      update[Feature]Data(prevData =>
        prevData.map(item =>
          item.id === variables.id ? { ...item, ...data } : item
        )
      );

      // Invalidate cache to ensure consistency
      queryClient.invalidateQueries({ queryKey: [feature]Keys.lists() });
    },
    onError: (error) => {
      console.error("Failed to update [feature]:", error);
    },
  });
};
```

### 2. Update Store with Functional Updates

```typescript
export const use[Feature]Store = create<[Feature]State>((set, get) => ({
  data: [],

  // For direct updates
  set[Feature]Data: (data) => {
    set({ data });
  },

  // For functional updates (recommended for mutations)
  update[Feature]Data: (updater) => {
    set((state) => ({ data: updater(state.data) }));
  },
}));
```

### 3. Use Mutations in Components

```typescript
const [Feature]Component = () => {
  const updateMutation = useUpdate[Feature]();

  const handleUpdate = (id: string, newData: any) => {
    updateMutation.mutate({ id, ...newData });
  };

  return (
    <Button
      onPress={() => handleUpdate(item.id, newData)}
      disabled={updateMutation.isPending}
    >
      {updateMutation.isPending ? "Updating..." : "Update"}
    </Button>
  );
};
```

## Accessing Data in Components

### Option 1: Direct Store Access (Recommended for UI)

```typescript
import { useNotificationStore } from "src/stores/notificationStore";

const NotificationBadge = () => {
  const { unreadCount } = useNotificationStore();

  return <Badge count={unreadCount} />;
};
```

### Option 2: Combined Hook (Best of Both Worlds)

```typescript
// Create a custom hook that combines both
export const useNotificationCount = () => {
  const { unreadCount } = useNotificationStore();
  const { data, isLoading, error, refetch } = useUnreadCount();

  return {
    unreadCount, // Instant updates from Zustand
    isLoading, // Loading state from TanStack Query
    error, // Error state from TanStack Query
    refetch, // Manual refetch from TanStack Query
  };
};

// Use in components
const NotificationBadge = () => {
  const { unreadCount, isLoading } = useNotificationCount();

  if (isLoading) return <Spinner />;

  return <Badge count={unreadCount} />;
};
```

### Option 3: App-Level Data Fetching

```typescript
// In app/_layout.tsx or similar
const RootLayout = () => {
  const { authData, isLoading } = useAuthStore();
  const { refetch: refetchUnreadCount } = useUnreadCount();

  useEffect(() => {
    if (authData && !isLoading) {
      refetchUnreadCount(); // Fetch when user is authenticated
    }
  }, [authData, isLoading, refetchUnreadCount]);
};
```

## Best Practices

1. **Query Keys**: Use consistent, hierarchical query keys for better cache management
2. **Error Handling**: Handle errors in both TanStack Query and Zustand
3. **Stale Time**: Set appropriate stale times based on data freshness requirements
4. **Cache Invalidation**: Use `invalidateQueries` when data changes
5. **Loading States**: Use TanStack Query's `isLoading` for initial loads, `isFetching` for background updates
6. **Mutations**: Use `useMutation` for PUT/POST/DELETE operations
7. **Optimistic Updates**: Update local state immediately, then invalidate cache
8. **Error Recovery**: Handle mutation errors gracefully
9. **App-Level Fetching**: Use TanStack Query hooks in layout components for global data
10. **Component-Level Access**: Use Zustand store for instant UI updates

## Migration Strategy

1. **Phase 1**: Implement new pattern alongside existing code
2. **Phase 2**: Update components one by one to use new hooks
3. **Phase 3**: Remove legacy methods from stores
4. **Phase 4**: Clean up unused code

## 🚨 **Common Mistakes & Troubleshooting**

### **❌ Common Mistakes:**

1. **Forgetting to update store in query success:**

   ```typescript
   // ❌ Wrong - data fetched but store not updated
   return useQuery({ queryKey, queryFn });

   // ✅ Correct - store updated on success
   return useQuery({
     queryKey,
     queryFn: async () => {
       const response = await apiCall();
       setStoreData(response.data); // ← This is crucial!
       return response.data;
     },
   });
   ```

2. **Not invalidating cache after mutations:**

   ```typescript
   // ❌ Wrong - cache not invalidated
   onSuccess: (data) => {
     updateStore(data);
   };

   // ✅ Correct - cache invalidated
   onSuccess: (data) => {
     updateStore(data);
     queryClient.invalidateQueries({ queryKey }); // ← This is crucial!
   };
   ```

3. **Using wrong loading state:**

   ```typescript
   // ❌ Wrong - isFetching shows loading for background updates too
   if (isFetching) return <Loader />;

   // ✅ Correct - isLoading only for initial loads
   if (isLoading) return <Loader />;
   ```

4. **Not handling errors from both sources:**

   ```typescript
   // ❌ Wrong - only handling one error source
   if (error) return <Error />;

   // ✅ Correct - handling both error sources
   const displayError = error || queryError?.message;
   if (displayError) return <Error />;
   ```

### **🔧 Troubleshooting:**

- **Cache not updating**: Check query keys and invalidation calls
- **Loading states**: Ensure you're using the right loading state (`isLoading` vs `isFetching`)
- **Error handling**: Make sure both TanStack Query and Zustand errors are handled
- **Memory leaks**: Use proper cleanup in useEffect hooks
- **Stale data**: Check if `enabled` option is preventing fetches
- **Duplicate API calls**: Ensure query keys are consistent across components

### **🎯 Performance Tips:**

1. **Use appropriate stale times:**

   - Critical data (counts, balances): 2 minutes
   - General data (lists, profiles): 5 minutes
   - Static data (settings): 15+ minutes

2. **Optimize query keys:**

   ```typescript
   // ✅ Good - hierarchical and consistent
   export const keys = {
     all: ["users"] as const,
     lists: () => [...keys.all, "list"] as const,
     list: (filters) => [...keys.lists(), { filters }] as const,
   };
   ```

3. **Use enabled option wisely:**
   ```typescript
   // Only fetch when conditions are met
   useQuery({
     queryKey,
     queryFn,
     enabled: !!userId && !isLoading,
   });
   ```

## 🎉 **Final Result**

This pattern provides the best of both worlds:

- **TanStack Query**: Powerful caching, background updates, error handling
- **Zustand**: Instant UI updates, local state management
- **Combined**: Optimal performance + great UX

Your app will have:

- ✅ No repeated API calls
- ✅ Instant UI updates
- ✅ Automatic background sync
- ✅ Optimistic updates
- ✅ Smart caching
- ✅ Better user experience
