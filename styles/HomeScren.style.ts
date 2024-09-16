import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 25,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 95,
  },

  codeInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#EEEEEF",
    fontSize: 12,
    paddingLeft: 15,
    marginTop: 50,
  },

  connectBtn: {
    width: "100%",
    backgroundColor: "black",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  connectBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  manualMoveBtn: {
    textAlign: "center",
    marginTop: 15,
    color: "#868686",
    fontSize: 12,
  },
});

export default styles;
