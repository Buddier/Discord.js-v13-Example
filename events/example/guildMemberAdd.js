/**
 * Example Event
 */

module.exports = {
    name: 'guildMemberAdd',

    /**
     * @param {GuildMember} member 
     * @param {Client} client 
     */
    async execute(member, client) {
        const { guild } = member;

        console.log(`${member.username} join guilds ${guild.name}`);
    }
}
