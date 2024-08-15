import { create } from "zustand";

const usePreviewStore = create((set) => ({
// Stores initial state
  previews: JSON.parse(localStorage.getItem("previews")) || null,
  error: null,
}));
