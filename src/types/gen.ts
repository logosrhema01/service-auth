/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/token": {
    /** Returns in descending order of most recently used */
    get: operations["tokenGet"];
    post: operations["tokenPost"];
    /** If the token is not specified, all tokens of the user are revoked */
    delete: operations["tokenDelete"];
  };
  "/invite-links": {
    /**
     * To generate an invite link for a specific set of scopes, you must also have the same set of scopes.
     * Eg. you cannot generate a link which gives access to `MESSAGE_SEND` when you don't have access to `MESSAGE_SEND` yourself.
     * This is done for obvious security concerns.
     */
    post: operations["inviteLinksPost"];
  };
  "/invite-links/{id}": {
    get: operations["inviteLinksGet"];
  };
  "/orgs": {
    get: operations["orgsGet"];
    post: operations["orgsPost"];
    /**
     * - If you want to update/delete members -- ensure you have the `ORGMEMBERS_UPDATE` scope
     * - If you want to delete invite links -- ensure you have the `ORGLINKS_UPDATE` scope
     * - Also you cannot delete/update yourself in the organization. If you attempt to do so, a 400 will be returned
     */
    patch: operations["orgsPatch"];
  };
  "/orgs/join": {
    post: operations["orgsJoinInvite"];
  };
  "/users": {
    get: operations["usersGet"];
    post: operations["usersPost"];
    /** Deletes the user specified */
    delete: operations["usersDelete"];
    patch: operations["usersPatch"];
  };
  "/users/password": {
    patch: operations["usersPasswordPatch"];
  };
  "/notify": {
    post: operations["notify"];
  };
}

export interface components {
  schemas: {
    Scope:
      | "TOKENS_READ"
      | "TOKENS_DELETE"
      | "USERS_PATCH"
      | "USERS_DELETE"
      | "ORG_UPDATE"
      | "ORGLINK_CREATE"
      | "ORGLINK_READ"
      | "ORGMEMBERS_UPDATE"
      | "ORGMEMBERS_READ"
      | "ORG_NOTIFY"
      | "ADMIN_PANEL_ACCESS";
    JWT: {
      /** Binary representation of the scope array */
      scope: string;
      exp: number;
      iat: number;
      user: {
        id: string;
        orgId: string;
        firstName?: string;
        lastName?: string;
        email: number;
      };
    };
    TokenPostResponse: {
      access_token: string;
      refresh_token?: string;
      refresh_token_expiry?: components["schemas"]["Timestamp"];
    };
    PasswordAuthRequest: {
      email: string;
      returnRefreshToken?: boolean;
      /** This will be the base64 encoded SHA256 of the plaintext password */
      password: string;
      /** The organization ID to generate the token for, lastUsedOrgId will be used otherwise */
      orgId?: string;
      scopes?: components["schemas"]["Scope"][];
      /** Should logging in with this organization ID update the lastUsedOrgId for login */
      updateLastUsedOrgId?: boolean;
      /** Force the generation of an access token */
      force?: boolean;
    };
    RefreshTokenLoginRequest: {
      refreshToken: string;
      /** The organization ID to generate the token for, lastUsedOrgId will be used otherwise */
      orgId: string;
      scopes?: components["schemas"]["Scope"][];
      /** Should fetching the token of a new organization update the lastUsedOrgId for login */
      updateLastUsedOrgId?: boolean;
      /** Force the generation of an access token */
      force?: boolean;
    };
    AuthRequest:
      | components["schemas"]["PasswordAuthRequest"]
      | components["schemas"]["RefreshTokenLoginRequest"];
    OAuthRequest: {
      /** The email */
      email: string;
      /** Plaintext password */
      password: string;
      grant_type?: "password";
      /** Space separated scopes */
      scope?: string;
    };
    /**
     * A refresh token allows you to generate access tokens to access & update things on Alte services.
     * A refresh token will expire and become invalidated after 14 days of no activity.
     */
    RefreshToken: {
      token: string;
      userId: string;
      createdAt: components["schemas"]["Timestamp"];
      expiresAt: components["schemas"]["Timestamp"];
    };
    NotifyModel: {
      email?: boolean;
    };
    ResetPassword: {
      password: string;
    };
    UserPatch: {
      firstName?: string;
      lastName?: string;
      email?: string;
      notify?: components["schemas"]["NotifyModel"];
      /** new password. */
      password?: string;
      dob?: components["schemas"]["Timestamp"];
      gender?: "Male" | "Female" | "Other";
      location?: string;
      phone?: string;
    };
    UserCreate: {
      firstName: string;
      lastName: string;
      email: string;
      /** SHA256 of the plaintext password pls */
      password: string;
      notify?: components["schemas"]["NotifyModel"];
      dob: components["schemas"]["Timestamp"];
      gender?: "Male" | "Female" | "Other";
      location?: string;
      phone?: string;
      /** Sign up with a referral code */
      referralCode?: string;
    };
    UserCreateMethod: "admin-panel" | "alte";
    User: {
      id: string;
      createdAt: components["schemas"]["Timestamp"];
      updatedAt: components["schemas"]["Timestamp"];
      disabledAt?: components["schemas"]["Timestamp"];
      firstName: string;
      lastName: string;
      email: string;
      /** The last used organization ID, your refresh token when logging in is generated for this organization */
      lastUsedOrgId?: string;
      location?: string;
      gender?: "Male" | "Female" | "Other";
      /** Will only contain numbers, no + sign, brackets etc. */
      phone?: string;
      createdByMethod?: components["schemas"]["UserCreateMethod"];
      notify?: components["schemas"]["NotifyModel"];
      /** The referral code used for sign-up */
      referralCode?: string | null;
      memberships?: components["schemas"]["OrgMember"][];
    };
    OrgMember: {
      org?: components["schemas"]["Organization"];
      user?: components["schemas"]["User"];
      userId: string;
      orgId: string;
      addedAt: components["schemas"]["Timestamp"];
      addedBy?: string | null;
      role?: "admin" | "hr" | "mentor" | "student" | "sudo";
      scopes: components["schemas"]["Scope"][];
    };
    OrgCreate: {
      name?: string;
      email?: string;
      url?: string;
      mode?: "online" | "traditional" | "hybrid";
      isHiring?: boolean;
      isAdmitting?: boolean;
      /** organization subscription plan, enums TBD */
      plan?: string;
    };
    OrgMetadata: {
      name?: string;
      email?: string;
      url?: string;
      mode?: "online" | "traditional" | "hybrid";
      isHiring?: boolean;
      isAdmitting?: boolean;
      /** organization subscription plan, enums TBD */
      plan?: string;
    };
    InviteLink: {
      id: string;
      /** The org it can join */
      orgId: string;
      /** User ID of the person who created the link */
      createdBy: string;
      createdAt: components["schemas"]["Timestamp"];
      expiresAt: components["schemas"]["Timestamp"];
      /** The scopes allowed for the invite link */
      scopes: components["schemas"]["Scope"][];
    };
    Organization: {
      id: string;
      createdAt: components["schemas"]["Timestamp"];
      updatedAt: components["schemas"]["Timestamp"];
      /** Who created the Organization */
      createdBy?: string;
      name: string;
      email?: string;
      url?: string;
      mode?: "online" | "traditional" | "hybrid";
      isHiring?: boolean;
      isAdmitting?: boolean;
      /** organization subscription plan, enums TBD */
      plan?: string;
      inviteLinks?: components["schemas"]["InviteLink"][];
    };
    OrgPatchRequest: {
      name?: string;
      email?: string;
      url?: string;
      mode?: "online" | "traditional" | "hybrid";
      isHiring?: boolean;
      isAdmitting?: boolean;
      members?: {
        id: string;
        scopes?: components["schemas"]["Scope"][];
        /** If set, will delete the organization member */
        delete?: true;
      }[];
      inviteLinks?: {
        id: string;
        /** If set, will delete the invite link */
        delete?: true;
      }[];
    };
    Timestamp: Date | string;
    NotificationResult: string | boolean;
  };
  responses: {
    /** There was an error */
    ErrorResponse: {
      content: {
        "application/json": {
          statusCode?: number;
          /** Specific description of the error */
          error?: string;
          /** What the error was */
          message?: string;
          /** Some extra information about the error */
          data?: { [key: string]: any };
        };
      };
    };
  };
}

export interface operations {
  /** Returns in descending order of most recently used */
  tokenGet: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["RefreshToken"][];
        };
      };
      400: components["responses"]["ErrorResponse"];
      401: components["responses"]["ErrorResponse"];
      403: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
  };
  tokenPost: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            access_token: string;
            refresh_token?: string;
            refresh_token_expiry?: components["schemas"]["Timestamp"];
            was_forced?: boolean;
          };
        };
      };
      400: components["responses"]["ErrorResponse"];
      401: components["responses"]["ErrorResponse"];
      403: components["responses"]["ErrorResponse"];
      409: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AuthRequest"];
      };
    };
  };
  /** If the token is not specified, all tokens of the user are revoked */
  tokenDelete: {
    parameters: {
      query: {
        token?: string;
      };
    };
    responses: {
      /** Revoked */
      204: never;
      400: components["responses"]["ErrorResponse"];
      401: components["responses"]["ErrorResponse"];
      403: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
  };
  /**
   * To generate an invite link for a specific set of scopes, you must also have the same set of scopes.
   * Eg. you cannot generate a link which gives access to `MESSAGE_SEND` when you don't have access to `MESSAGE_SEND` yourself.
   * This is done for obvious security concerns.
   */
  inviteLinksPost: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["InviteLink"];
        };
      };
      400: components["responses"]["ErrorResponse"];
      401: components["responses"]["ErrorResponse"];
      403: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": {
          scopes: components["schemas"]["Scope"][];
        };
      };
    };
  };
  inviteLinksGet: {
    parameters: {
      path: {
        /** the invite link ID */
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["InviteLink"];
        };
      };
      400: components["responses"]["ErrorResponse"];
      401: components["responses"]["ErrorResponse"];
      403: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
  };
  orgsGet: {
    parameters: {
      query: {
        /** Search by name, ID, invite code, etc. */
        q?: string;
        /** Fetch specific orgs by ID */
        id?: string[];
        /** orgs that contain this user ID */
        userId?: string;
        /** The numbers of items to return */
        count?: number;
        /** The page number */
        page?: number;
        /** Should include the organization members. Will only return members for which you have the `ORGMEMBERS_READ` scope */
        includeOrgMembers?: boolean;
        /** Should include the invite links.  Will only return invite links for which you have the `ORGLINKS_READ` scope */
        includeInviteLinks?: boolean;
        /** include the count of the total orgs */
        includeTotal?: boolean;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            total?: number;
            orgs: components["schemas"]["Organization"][];
          };
        };
      };
      400: components["responses"]["ErrorResponse"];
      401: components["responses"]["ErrorResponse"];
      403: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
  };
  orgsPost: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            success: boolean;
          };
        };
      };
      400: components["responses"]["ErrorResponse"];
      401: components["responses"]["ErrorResponse"];
      403: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["OrgCreate"];
      };
    };
  };
  /**
   * - If you want to update/delete members -- ensure you have the `ORGMEMBERS_UPDATE` scope
   * - If you want to delete invite links -- ensure you have the `ORGLINKS_UPDATE` scope
   * - Also you cannot delete/update yourself in the organization. If you attempt to do so, a 400 will be returned
   */
  orgsPatch: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            success: boolean;
          };
        };
      };
      400: components["responses"]["ErrorResponse"];
      401: components["responses"]["ErrorResponse"];
      403: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["OrgPatchRequest"];
      };
    };
  };
  orgsJoinInvite: {
    parameters: {
      query: {
        /** inviteLink id */
        id: string;
      };
    };
    responses: {
      /** OK */
      204: never;
      400: components["responses"]["ErrorResponse"];
      401: components["responses"]["ErrorResponse"];
      403: components["responses"]["ErrorResponse"];
      404: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
  };
  usersGet: {
    parameters: {
      query: {
        /** Search by name, ID, email, phone etc. */
        q?: string;
        /** Fetch specific users by ID */
        id?: string[];
        /** The numbers of items to return */
        count?: number;
        /** The page number */
        page?: number;
        /** Should include the user's memberships */
        includeMemberships?: boolean;
        /** should return total count of accessible users */
        includeTotal?: boolean;
        /** other internal query options */
        other?: string[];
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            total?: number;
            users: components["schemas"]["User"][];
          };
        };
      };
      400: components["responses"]["ErrorResponse"];
      401: components["responses"]["ErrorResponse"];
      403: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
  };
  usersPost: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      400: components["responses"]["ErrorResponse"];
      401: components["responses"]["ErrorResponse"];
      403: components["responses"]["ErrorResponse"];
      409: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCreate"];
      };
    };
  };
  /** Deletes the user specified */
  usersDelete: {
    parameters: {
      query: {
        id: string;
      };
    };
    responses: {
      /** Deleted */
      204: never;
      401: components["responses"]["ErrorResponse"];
      403: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
  };
  usersPatch: {
    parameters: {
      query: {
        /** Change the password of this user ID */
        userId?: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserPatch"];
      };
    };
  };
  usersPasswordPatch: {
    responses: {
      /** OK */
      204: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ResetPassword"];
      };
    };
  };
  notify: {
    parameters: {
      query: {
        userId: string;
        /** Override notify on WhatsApp */
        notifyWhatsApp?: boolean;
        /** Override notify on Email */
        notifyEmail?: boolean;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": {
            whatsapp: components["schemas"]["NotificationResult"];
            email: components["schemas"]["NotificationResult"];
          };
        };
      };
      400: components["responses"]["ErrorResponse"];
      401: components["responses"]["ErrorResponse"];
      403: components["responses"]["ErrorResponse"];
      404: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": {
          title: string;
          content: string;
          parameters?: { [key: string]: any };
        };
      };
    };
  };
}

export interface external {}
