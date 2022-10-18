import { ILibrary } from 'types/i-library';

const libraryDB: ILibrary = {
    books: [
        {
            id: '1',
            title: 'Жизнь Пи',
            authors: 'Янн  Мартел',
            favorite: 'true',
            description: '«Жизнь Пи» произвела настоящий культурный взрыв в мировой' +
                'интеллектуальной среде.Фантастическое путешествие юноши и бенгальского' +
                'тигра, описанное в романе, перекликается с повестью «Старик и море», с' +
                'магическим реализмом Маркеса и с абсурдностью Беккета.Книга стала не' +
                'только бестселлером, но и символом литературы нового века, флагом новой' +
                'культуры.',
            fileBook: '1.pdf',
            fileCover: '1.png',
        },
        {
            id: '2',
            title: 'Flowers',
            authors: 'dd',
            favorite: 'dad',
            description: 'dasd asda sdasd',
            fileBook: '',
            fileCover: '',
        }],
    users: [],
};

export { libraryDB };