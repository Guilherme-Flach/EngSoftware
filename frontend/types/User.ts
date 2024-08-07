import Idea from "./Idea";
import Vote from "./Vote";

export default interface User {
  id: number;
  username: string;
  email: string;
  password: string;

  ideas?: Idea[];
  votes?: Vote[];
}
