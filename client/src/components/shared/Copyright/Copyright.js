import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export const Copyright = () => {

  return (
    <>
    <Typography variant="body2"
                color="textSecondary"
                align="center">

      {'Instagram-Сlone© '}
      <Link color="inherit"
            href="https://github.com/kizotovua/insta-clone-ua">
        by Kirill Izotov

      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </>
  );
}

export default Copyright;

