"use client";
import { useAuth } from "../app/context/auth-context";
import CurhatPopup from "./CurhatPopup";

const CurhatWrapper = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return null;

  return <CurhatPopup />;
};

export default CurhatWrapper;