const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWTKEY;
exports.auth = (req, res, next) => {
    //console.log(req.headers)
    // 인증 완료
    try {
        // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰을 req.decoded에 반환
        req.decoded = jwt.verify(req.headers.authorization, SECRET_KEY);        
        return next();
    }
    // 인증 실패
    catch (error) {
        // 유효시간이 초과된 경우
       
        if (error.name === 'TokenExpiredError') {
            console.log(1)
            return res.status(200).json({
                code: 402,
                msg: '토큰이 만료되었습니다.'
            });
        }
        // 토큰의 비밀키가 일치하지 않는 경우
        
        if (error.name === 'JsonWebTokenError') {
            console.log(error)
            return res.status(200).json({
                code: 402,
                msg: '유효하지 않은 토큰입니다.'
            });
        }
    }
}