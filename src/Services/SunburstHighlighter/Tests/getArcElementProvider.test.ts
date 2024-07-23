// @ts-nocheck
import { getArcElementProvider } from "../getArcElementProvider"

describe('getArcElementProvider', () => {
    let ref: React.MutableRefObject<SVGGElement | null>

    beforeEach(() => {
        ref = { current: document.createElement('g') }
    })

    describe('when called', () => {
        it('should return an arc element provider', () => {
            const arcElementProvider = getArcElementProvider(ref)

            expect(arcElementProvider).toBeDefined()
            // assert other expectations about the arc element provider if needed
        })
    })
    //TODO
})
