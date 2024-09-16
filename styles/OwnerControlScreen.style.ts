import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  toggleBtn: {
    width: 64,
    height: 64,
    backgroundColor: "#D9D9D9",
    borderWidth: 4,
    borderColor: "#D4D4D4",
    borderRadius: 64 / 2,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "semibold",
  },
  hoverBtn: {
    width: "70%",
    aspectRatio: 1 / 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
    borderWidth: 4,
    borderColor: "#D4D4D4",
    borderRadius: 999999,
    alignSelf: "center",
    marginTop: 46,
  },
  hover: {
    backgroundColor: "#D1D1D1",
  },
  colorContainer: {
    marginTop: 70,
  },
  colorAddBtn: {
    fontSize: 24,
    alignSelf: "flex-end",
  },
  colors: {
    marginTop: 7,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 20,
  },
});

export default styles;
