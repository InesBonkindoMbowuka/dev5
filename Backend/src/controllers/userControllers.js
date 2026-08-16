const User = require("../models/User");

class UserController {
	async getOrCreateUser(req, res) {
		try {
			const { userUid } = req.body;

			if (!userUid) {
				return res.status(400).json({
					message: "User UID is required",
				});
			}

			const user = await User.findOneAndUpdate(
				{ userUid },
				{
					$setOnInsert: {
						userUid,
					},
				},
				{
					new: true,
					upsert: true,
				},
			);

			res.json(user);
		} catch (error) {
			console.error(error);

			res.status(500).json({
				message: "Failed to get or create user",
			});
		}
	}

	async getStats(req, res) {
		try {
			const { userUid } = req.params;

			const user = await User.findOne({ userUid });

			if (!user) {
				return res.status(404).json({
					message: "User not found",
				});
			}

			res.json({
				wins: user.wins,
				wrongGuesses: user.wrongGuesses,
			});
		} catch (error) {
			console.error(error);

			res.status(500).json({
				message: "Failed to get user stats",
			});
		}
	}
}

module.exports = new UserController();
