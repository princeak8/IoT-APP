import type { Permission } from "./Permission"
import type { Role } from "./Role"

export interface UserType {
    firstname: String,
    lasstname?: String,
    username: String,
    email?: String,
    lastLogin?: Date,
    permission?: Permission,
    role: Role
}