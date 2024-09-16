import axios from "axios";
import { API_URL } from "@env";
import { JoinRoomDto } from "../types/joinRoomDto";
import { CreateRoomDto } from "../types/createRoomDto";

export const createRoom = async (dto: CreateRoomDto) => {
  await axios.post(`${API_URL}/room`, dto);
};

export const joinRoom = async (dto: JoinRoomDto) => {
  await axios.post(`${API_URL}/room/join`, dto);
};
