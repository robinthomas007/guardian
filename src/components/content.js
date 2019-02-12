import React from 'react';
import {ReleaseinformationPage, NewProjectPage, AudioFilesPage} from './pages';
import TopNav from './topNav';

const Content = () => {
    return(
        <section class="content col-10">
            <TopNav />
            <AudioFilesPage />
        </section>
    )
}

export default Content;