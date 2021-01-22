import React, { Suspense } from 'react';
import CustomLoading from 'components/common/CustomLoading';

const PublicLayout = ({ children }) => {
    return (
        <Suspense fallback={<CustomLoading />}>
            {children}
        </Suspense>
    );
};

export { PublicLayout };
