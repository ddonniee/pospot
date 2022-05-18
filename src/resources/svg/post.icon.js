const preBtn = (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_209_2185)">
    <path fillRule="evenodd" clipRule="evenodd" d="M18 30C25.732 30 32 23.732 32 16C32 8.26801 25.732 2 18 2C10.268 2 4 8.26801 4 16C4 23.732 10.268 30 18 30ZM15.9399 11.2824L16.6575 10.5859L18.0504 12.0211L17.3328 12.7176L14.4661 15.5H24H25V17.5H24H14.4661L17.3328 20.2824L18.0504 20.9789L16.6575 22.4141L15.9399 21.7176L11.3035 17.2176L10.5642 16.5L11.3035 15.7824L15.9399 11.2824Z" fill="white" fillOpacity="0.5" shapeRendering="crispEdges"/>
    </g>
    <defs>
    <filter id="filter0_d_209_2185" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="2"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_209_2185"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_209_2185" result="shape"/>
    </filter>
    </defs>
</svg>         
)

const nextBtn = (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_209_2189)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18 30C10.268 30 4 23.732 4 16C4 8.26801 10.268 2 18 2C25.732 2 32 8.26801 32 16C32 23.732 25.732 30 18 30ZM20.0601 11.2824L19.3425 10.5859L17.9496 12.0211L18.6672 12.7176L21.5339 15.5H12H11V17.5H12H21.5339L18.6672 20.2824L17.9496 20.9789L19.3425 22.4141L20.0601 21.7176L24.6965 17.2176L25.4358 16.5L24.6965 15.7824L20.0601 11.2824Z" fill="white" fillOpacity="0.5" shapeRendering="crispEdges"/>
                        </g>
                        <defs>
                        <filter id="filter0_d_209_2189" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="2"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_209_2189"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_209_2189" result="shape"/>
                        </filter>
                        </defs>
                    </svg>
)
const paging = (
    <svg width="56" height="6" viewBox="0 0 56 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="3" cy="3" r="3" fill="white"/>
                    <circle cx="13" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                    <circle cx="23" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                    <circle cx="33" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                    <circle cx="43" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                    <circle cx="53" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                </svg>
)
const close = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L20.0708 20.0708" stroke="white" strokeWidth="2.5"/>
                <path d="M20 4L3.92921 20.0708" stroke="white" strokeWidth="2.5"/>
            </svg>
)
export {preBtn,nextBtn,paging,close};