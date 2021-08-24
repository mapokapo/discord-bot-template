export default interface Argument {
  name: string;
  type:
    | "integer"
    | "float"
    | "string"
    | "bool"
    | "Username"
    | "Channel"
    | "Role"
    | "integer+"
    | "float+"
    | "string+"
    | "bool+"
    | "Username+"
    | "Channel+"
    | "Role+";
  desc: string;
  default: string | null;
}
