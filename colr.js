
// --fontkit-patch-colr-v1


var BaseGlyphPaintRecord = new r.Struct({
    glyphID:     r.uint16,   // Glyph ID of the base glyph.
    paintOffset: r.Offset32, // Offset to a Paint table.
});


var BaseGlyphList = new r.Struct({
    numBaseGlyphPaintRecords: r.uint32,
    baseGlyphPaintRecords:    new r.lazyArray(BaseGlyphPaintRecord, "numBaseGlyphPaintRecords"),
});


var PaintTable = new r.VersionedStruct(r.uint8, {
    header: {
        // so many versions, there is no common header beyond version number
    },
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
    10: {},
    11: {},
    12: {},
    13: {},
    14: {},
    15: {},
    16: {},
    17: {},
    18: {},
    19: {},
    20: {},
    21: {},
    22: {},
    23: {},
    24: {},
    25: {},
    26: {},
    27: {},
    28: {},
    29: {},
    30: {},
    31: {},
    32: {},
});


var LayerList = new r.Struct({
    numLayers: r.uint32,
    paintOffsets: new r.Pointer(r.uint32, new r.Array(PaintTable, 'numLayers'), { type: 'parent', lazy: true }),
});


var ClipBox = new r.VersionedStruct(r.uint8, {
    header: {
        xMin: r.int16,
        yMin: r.int16,
        xMax: r.int16,
        yMax: r.int16,
    },

    0: {
        // no additional fields
    },

    1: {
        varIndexBase: r.uint32
    }
});


var Clip = new r.Struct({
    startGlyphID: r.uint16,
    endGlyphID: r.uint16,
    clipBox: new r.Pointer(r.uint24, ClipBox, { type: 'parent'})
});


var ClipListTable = new r.Struct({
    format: r.uint8, // must be 1
    numClips: r.uint32,
    clips: new r.lazyArray(Clip, 'numClips'),
});


var COLR = new r.VersionedStruct(r.uint16, {
  header: {
    numBaseGlyphRecords: r.uint16,
    baseGlyphRecord: new r.Pointer(r.uint32, new r.Array(BaseGlyphRecord, "numBaseGlyphRecords")),
    layerRecords: new r.Pointer(r.uint32, new r.Array(LayerRecord, "numLayerRecords"), { lazy: true }),
    numLayerRecords: r.uint16,
  },

  0: {
      // no additional fields
  },

  1: {
    baseGlyphList: new r.Pointer(r.uint32, BaseGlyphList, {type: 'parent', lazy: true}),
    layerListOffset: new r.Pointer(r.uint32, LayerList, {type: 'parent', lazy: true}),
    clipListOffset: new r.Pointer(r.uint32, ClipList, {type: 'parent', lazy: true}),
    varIndexMapOffset: new r.Pointer(r.uint32, new r.Array(DeltaSetIndex, "baseGlyphListOffset"),
    itemVariationStoreOffset: new r.Pointer(r.uint32, new r.Array(ItemVariationStore, "baseGlyphListOffset"),
  },
});
