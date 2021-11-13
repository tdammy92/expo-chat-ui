import React, { useState, useEffect, memo } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Platform,
	TouchableOpacity,
	Animated,
} from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import EmojiPicker from "./emojis/EmojiPicker";

import { theme } from "../../theme";

const ChatInput = ({ reply, closeReply, isLeft, username }) => {
	const [message, setMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [heightValue, setHeightValue] = useState(new Animated.Value(70));

	useEffect(() => {
		showEmojis();
	}, [showEmojiPicker]);

	useEffect(() => {
		showReply();
	}, [reply]);

	const showEmojis = () => {
		Animated.timing(heightValue, {
			toValue: showEmojiPicker ? 450 : reply ? 130 : 70,
			duration: 50,
			useNativeDriver: false,
		}).start();
	};

	const showReply = () => {
		Animated.timing(heightValue, {
			toValue: reply
				? showEmojiPicker
					? 450
					: 130
				: showEmojiPicker
				? 400
				: 70,
			duration: 50,
			useNativeDriver: false,
		}).start();
	};

	return (
		<Animated.View style={[{ height: heightValue }, styles.container]}>
			{reply ? (
				<View style={styles.replyContainer}>
					<TouchableOpacity onPress={closeReply} style={styles.closeReply}>
						<Icon name="close" color="#000" size={20} />
					</TouchableOpacity>
					<Text style={styles.title}>
						Response to {isLeft ? username : "Me"}
					</Text>
					<Text style={styles.reply}>{reply}</Text>
				</View>
			) : null}
			<View style={styles.innerContainer}>
				<View style={styles.inputAndMicrophone}>
					<TouchableOpacity
						style={styles.emoticonButton}
						onPress={() => setShowEmojiPicker((value) => !value)}
					>
						<Icon
							name={
								showEmojiPicker ? "close" : "emoticon-outline"
							}
							size={23}
							color={theme.colors.description}
						/>
					</TouchableOpacity>
					<TextInput
						multiline
						placeholder="Type something..."
						style={styles.input}
						value={message}
						onChangeText={(text) => setMessage(text)}
					/>
					<TouchableOpacity style={styles.rightIconButtonStyle}>
						<Icon
							name="paperclip"
							size={23}
							color={theme.colors.description}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.rightIconButtonStyle}>
						<Icon
							name="camera"
							size={23}
							color={theme.colors.description}
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.sendButton}>
					<Icon
						name={message ? "send" : "microphone"}
						size={23}
						color={theme.colors.white}
					/>
				</TouchableOpacity>
			</View>
			<EmojiPicker />
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		backgroundColor: theme.colors.white,
	},
	replyContainer: {
		paddingHorizontal: 10,
		marginHorizontal: 10,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	title: {
		marginTop: 5,
		fontWeight: "bold",
	},
	closeReply: {
		position: 'absolute',
		right: 10,
		top: 5
	},
	reply: {
		marginTop: 5,
	},
	innerContainer: {
		paddingHorizontal: 10,
		marginHorizontal: 10,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		paddingVertical: 10,
	},
	inputAndMicrophone: {
		flexDirection: "row",
		backgroundColor: theme.colors.inputBackground,
		flex: 3,
		marginRight: 10,
		paddingVertical: Platform.OS === "ios" ? 10 : 0,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "space-between",
	},
	input: {
		backgroundColor: "transparent",
		paddingLeft: 20,
		color: theme.colors.inputText,
		flex: 3,
		fontSize: 15,
		height: 50,
		alignSelf: "center",
	},
	rightIconButtonStyle: {
		justifyContent: "center",
		alignItems: "center",
		paddingRight: 15,
		paddingLeft: 10,
		borderLeftWidth: 1,
		borderLeftColor: "#fff",
	},
	emoticonButton: {
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 10,
	},
	sendButton: {
		backgroundColor: theme.colors.primary,
		borderRadius: 50,
		height: 50,
		width: 50,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default memo(ChatInput);
