export function UserEntityTransformer(user) {
    // delete user["password"];
    const { password, ...fields } = user._doc;

    return fields;
}