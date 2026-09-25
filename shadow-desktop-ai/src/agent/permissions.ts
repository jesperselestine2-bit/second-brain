import type { PermissionRequest, PermissionScope } from './types';

const approved = new Set<PermissionScope>();

export function requestPermission(scope: PermissionScope, reason: string): PermissionRequest {
  return { scope, reason, approved: approved.has(scope) };
}

export function approvePermission(scope: PermissionScope): void {
  approved.add(scope);
}

export function revokePermission(scope: PermissionScope): void {
  approved.delete(scope);
}

export function hasPermission(scope: PermissionScope): boolean {
  return approved.has(scope);
}

export function revokeAllPermissions(): void {
  approved.clear();
}
