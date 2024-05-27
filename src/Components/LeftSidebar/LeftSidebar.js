import React from 'react';
import LeftSidebar1 from './LeftSidebar1';
// import LeftSidebar2 from './LeftSidebar2';
// import LeftSidebar3 from './LeftSidebar3';

const LeftSidebar = ({ leftSidebarProps, leftSidebarType }) => {
    const renderLeftSidebar = () => {
        switch (leftSidebarType) {
            case 'LeftSidebar1':
                return <LeftSidebar1 {...leftSidebarProps} />;
            // case 'LeftSidebar2':
            //     return <LeftSidebar2 {...leftSidebarProps} />;
            // case 'LeftSidebar3':
            //     return <LeftSidebar3 {...leftSidebarProps} />;
            default:
                return null;
        }
    };

    return <>{renderLeftSidebar()}</>;
};

export default LeftSidebar;
