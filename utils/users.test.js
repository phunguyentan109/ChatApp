const expect = require("expect");
const {Users} = require("./users");

describe("Users", () => {

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: "1",
                name: "Mike",
                room: "Node Course"
            },
            {
                id: "2",
                name: "Phu",
                room: "React Course"
            },
            {
                id: "3",
                name: "Julie",
                room: "Node Course"
            }
        ]
    });

    it("should add new user", () => {
        let users = new Users();
        let user = {
            id: "123",
            name: "Phu",
            room: "The Room"
        }
        let resUser = users.addUser(...Object.values(user));
        expect(users.users).toEqual([user]);
    });

    it("should remove a user", () => {
        let userId = "1";
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it("should not remove a user", () => {
        let userId = "99";
        let user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it("should find user", () => {
        let userId = "1";
        let foundUser = users.getUser(userId);

        expect(foundUser.id).toBe(userId);
    });

    it("should not find the user", () => {
        let userId = "99";
        var user = users.getUser(userId);

        expect(user).toBeFalsy();
    });

    it("should return name for the node course", () => {
        let userList = users.getUserList("Node Course");
        expect(userList).toEqual(["Mike", "Julie"]);
    });

    it("should return name for the react course", () => {
        let userList = users.getUserList("React Course");
        expect(userList).toEqual(["Phu"]);
    });
})
