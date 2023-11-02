import request from "@/utils/request";

export const getReturnApplyPageApi = ({
                                          pageNum, pageSize,
                                          orderNo,
                                          status,
                                          applyTime,
                                          operateBy,
                                          operateTime
                                      }) => {
    return request({
        url: '/returnApply',
        method: 'get',
        params: {
            pageNum,
            pageSize,

            orderNo,
            status,
            applyTime,
            operateBy,
            operateTime
        }
    })
}

export const getReturnApplyDetailApi = (id) => {
    return request({
        url: `/returnApply/${id}`,
        method: 'get'
    })
}