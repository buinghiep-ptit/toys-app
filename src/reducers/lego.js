const initialState = {
    listModel: [{
        id: 1,
        name: 'Aatrox animation skin',
        avatar: './avatars/aatrox.png',
        dateCreation: '07/11/2020',
        urlModel: '/models/league_of_legends_-_aatrox.zip',
        audio: './audios/aatrox.mp3',
        urlBackground: '/backgrounds/bg_lol/aatrox.png',
        views: '1.1k',
        comments: 15,
        likes: 8,
        description: ''
    },
    {
        id: 2,
        name: 'Darius skin',
        avatar: './avatars/darius.png',
        dateCreation: '07/11/2020',
        urlModel: '/models/darius.zip',
        audio: './audios/darius.mp3',
        urlBackground: '/backgrounds/bg_lol/darius.png',
        views: '23',
        comments: 4,
        likes: 17,
        description: ''
    },
    {
        id: 3,
        name: 'Shen base skin',
        avatar: './avatars/shen.png',
        dateCreation: '06/11/2020',
        urlModel: '/models/shen_base_skin.zip',
        audio: './audios/shen.mp3',
        urlBackground: './backgrounds/bg_lol/shen.png',
        views: '102',
        comments: 9,
        likes: 27,
        description: ''
    },
    {
        id: 4,
        name: 'Yasuo skin edit',
        avatar: './avatars/yasuo.png',
        dateCreation: '06/11/2020',
        urlModel: './models/yasuo_3rd_skin_edit.zip',
        audio: './audios/yasuo.mp3',
        urlBackground: './backgrounds/bg_lol/yasou.png',
        views: '29',
        comments: 13,
        likes: 11,
        description: ''
    }],
    activeId: null,
};

const legoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LEGO': {
            const newLegoList = [...state.list];
            newLegoList.push(action.payload);

            return {
                ...state,
                list: newLegoList,
            };
        }

        case 'SET_ACTIVE_LEGO': {
            const newActiveId = action.payload.id;
            return {
                ...state,
                activeId: newActiveId,
            };
        }

        default:
            return state;
    }
};
export default legoReducer;