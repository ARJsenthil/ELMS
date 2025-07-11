import { useEffect } from "react";

export const PageNotFound = (props) => {
    const { router, session } = props;
    useEffect(() => {
        !session ? router.navigate("/login") : router.navigate("/changePassword");
    }, []);
    return (
        <div>Page Not Found</div>
    )
}