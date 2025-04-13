"use client";
import React, {
	type FC,
	Fragment,
	type PropsWithChildren,
	useEffect,
	useState,
} from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return children;
	}

	return (
		<Fragment>
			<main className="dark:bg-neutral-900">{children}</main>
		</Fragment>
	);
};

export default MainLayout;
