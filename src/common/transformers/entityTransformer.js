export function UserEntityTransformer(user) {
    // delete user["password"];
    const { password, refreshToken, ...fields } = user._doc;

    return fields;
}