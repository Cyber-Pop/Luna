const { connect } = require("mongoose");
//connect to mongo db
connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log("Connected to MongoDB!"))
.catch(err => console.log(err));

const Cooldown = require("../models/cooldown");
const Guild = require("../models/guild");
const User = require("../models/user");

module.exports = Luna => ({
    fetchCD: async (id, type) => {
        const res = await Cooldown.findOne({
            userID: id,
            type: type
        }).catch(err => console.log(err));
        return res;
    },

    addCD: (id, type, created) => {
        Cooldown.findOne({
            userID: id,
            type: type
        }, (err, cd) => {
            if (err) console.log(err);
            if (!cd) {
                const newCooldown = new Cooldown({
                    userID: id,
                    type: type,
                    created: created
                });
                newCooldown.save().catch(err => console.log(err));
            } else {
                cd.created = created;
                cd.save().catch(err => console.log(err));
            };
        });
    },

    fetchUser: async id => {
        let res = await User.findOne({ userID: id }).catch(err => console.log(err));
        if (!res) {
            const newUser = new User({ userID: id });
            newUser.save().catch(err => console.log(err));
            res = newUser;
        };
        return res;
    },

    fetchGuild: async id => {
        let res = await Guild.findOne({ guildID: id }).catch(err => console.log(err));
        if (!res) {
            const newGuild = new Guild({ guildID: id });
            newGuild.save().catch(err => console.log(err));
            res = newGuild;
        };
        return res;
    },

    addHealth: async (id, health) => {
        const user = await Luna.db.fetchUser(id);
        user.health += health;
        let respawn = false;

        if (user.health <= 0) {
            user.shells = 10;
            user.level = 1;
            user.water = 0;
            user.food = 100;
            user.energy = 100;
            user.health = 10;
            respawn = true;
        };
        user.save().catch(err => console.log(err));
        return respawn;
    },

    addShells: async (id, shells) => {
        const user = await Luna.db.fetchUser(id);
        user.shells += shells;
        user.save().catch(err => console.log(err));
    },

    addWater: async (id, water) => {
        const user = await Luna.db.fetchUser(id);
        user.water += water;
        if (user.water >= Luna.nextLevel(user.level)) {
            user.water -= Luna.nextLevel(user.level);
            user.level += 1;
        };
        if (user.level >= Object.keys(Luna.creatures).length){
            user.level = Object.keys(Luna.creatures).length;
            user.water = 0;
        };
        user.save().catch(err => console.log(err));
    },

    addEnergy: async (id, energy) => {
        const user = await Luna.db.fetchUser(id);
        user.energy += energy;
        let res = null;

        if (user.energy <= 0) {
            user.energy = 0;
            res = "🚧 | Watch out! You're out of energy!";
            if (Math.random() < 0.3) {
                const respawn = await Luna.db.addHealth(id, -1);
                if (respawn) res = "Oh no! You've run out of energy and died! Respawning...";
            };
        };
        user.save().catch(err => console.log(err));
        return res;
    }
});