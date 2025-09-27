import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface IconLoaderProps {
  name: string;
  style?: object;
  color?: string;
}

export default function IconLoader({ name, style, color }: IconLoaderProps) {
  switch (name) {
    case "reading":
      return (
        <FontAwesome5
          style={style}
          name="book-reader"
          size={24}
          color={color ? color : "teal"}
        />
      );

    case "chat":
      return (
        <Entypo
          style={style}
          name="chat"
          size={24}
          color={color ? color : "teal"}
        />
      );

    case "monitoring":
      return (
        <Ionicons
          style={style}
          name="analytics"
          size={24}
          color={color ? color : "blue"}
        />
      );

    case "reflection":
      return (
        <MaterialCommunityIcons
          style={style}
          name="thought-bubble"
          size={24}
          color={color ? color : "gray"}
        />
      );

    case "right":
      return (
        <AntDesign
          style={style}
          name="right"
          size={20}
          color={color ? color : "black"}
        />
      );

    case "practice":
    case "action":
      return (
        <MaterialCommunityIcons
          style={style}
          name="meditation"
          size={24}
          color={color ? color : "teal"}
        />
      );

    case "connection":
    case "support":
      return (
        <MaterialCommunityIcons
          name="human-greeting-proximity"
          size={24}
          color={color ? color : "blue"}
          style={style}
        />
      );

    case "creativity":
      return (
        <MaterialCommunityIcons
          style={style}
          name="draw-pen"
          size={24}
          color={color ? color : "purple"}
        />
      );

    case "challenge":
      return (
        <Fontisto
          style={style}
          name="flag"
          size={24}
          color={color ? color : "green"}
        />
      );

    case "send":
      return (
        <MaterialIcons
          style={style}
          name="send"
          size={24}
          color={color ? color : "teal"}
        />
      );

    default:
      break;
  }
}
