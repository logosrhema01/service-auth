import { components } from "./gen";

export type IUser = components['schemas']['User']
export type IOrganization = components['schemas']['Organization']
export type IOrgMember = components['schemas']['OrgMember']
export type IUserRoles = components['schemas']['OrgMember']['role']
export type IUserCreateMethod = components['schemas']['UserCreateMethod']
export type IScope = components['schemas']['Scope']
export type IInviteLink = components['schemas']['InviteLink']
