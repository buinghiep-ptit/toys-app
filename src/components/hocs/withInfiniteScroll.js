import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const propTypes = {
    loading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
};
const defaultProps = {}

const withInfiniteScroll = (InnerComponent, debounce = 0) => {
    const InfiniteScroll = ({ loading, hasMore, changeRouter, ...props }) => {
        const options = useSelector(state => state.router.router.options);
        // const observer = useRef();
        // const lastBookElementRef = useCallback(node => {
        //     if (loading) return
        //     if (observer.current) observer.current.disconnect()
        //     observer.current = new IntersectionObserver(entries => {
        //         if (entries[0].isIntersecting && hasMore) {
        //             changeRouter({ path: 'games', options: { query: options.query, page: Number(options.page) + 1, page_size: 20 } });
        //         }
        //     })
        //     if (node) observer.current.observe(node)
        // }, [loading, hasMore, changeRouter, options.query, options.page]);

        // return (
        //     <div className=''>
        //         <InnerComponent
        //             loading={loading}
        //             lastBookElementRef={lastBookElementRef}
        //             {...props} />
        //     </div>
        // );
        useEffect(() => {
            const handleScroll = () => {
                if (
                    window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 200 && hasMore
                ) {
                    if (loading) return;
                    setTimeout(
                        () => {
                            changeRouter({ path: 'games', options: { query: options.query, page: Number(options.page) + 1, page_size: 20 } });
                        },
                        debounce
                    );
                }
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, [loading, hasMore, changeRouter, options.query, options.page]);
        return (
            <div className=''>
                <InnerComponent
                    loading={loading}
                    {...props} />
            </div>
        );
    };

    return InfiniteScroll;
};

withInfiniteScroll.propTypes = propTypes;
withInfiniteScroll.defaultProps = defaultProps;

export default withInfiniteScroll;
