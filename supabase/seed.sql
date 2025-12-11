-- Eskişehir App Seed Data
-- Run this after schema.sql to populate the database with initial data

-- ============================================
-- SEED CATEGORIES
-- ============================================
INSERT INTO categories (name, type) VALUES
    ('Tarihi Yerler', 'place'),
    ('Doğal Güzellikler', 'place'),
    ('Parklar', 'place'),
    ('El Sanatları', 'culture'),
    ('Müzeler', 'culture'),
    ('Tarihi Şahsiyetler', 'culture'),
    ('yemek', 'food'),
    ('tatlı', 'food')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- SEED PLACES
-- ============================================
INSERT INTO places (id, name, short_info, main_text, category, latitude, longitude, address) VALUES
    (
        'a1b2c3d4-e5f6-7890-abcd-ef1234567801'::uuid,
        'Odunpazarı Evleri',
        'Geleneksel Osmanlı mimarisi ile UNESCO Dünya Mirası Geçici Listesi''nde yer alan tarihi mahalle.',
        'Odunpazarı, Eskişehir''in en özgün tarihi bölgesidir. Dar sokakları, ahşap evleri ve nostaljik atmosferiyle ziyaretçilerini geçmişe götürür. 19. yüzyıl Osmanlı mimarisinin en güzel örneklerini barındıran bölge, restore edilen evleri, sanat galerileri ve müzeleriyle kültür turizmin merkezi haline gelmiştir. Bölgede bulunan Odunpazarı Modern Müze (OMM), çağdaş sanat eserleriyle dikkat çeker.',
        'Tarihi Yerler',
        39.7848,
        30.5233,
        'Odunpazarı, Eskişehir'
    ),
    (
        'a1b2c3d4-e5f6-7890-abcd-ef1234567802'::uuid,
        'Porsuk Çayı',
        'Eskişehir''in kalbinden geçen, şehre can veren nehir.',
        'Porsuk Çayı, Eskişehir''in en önemli doğal güzelliklerinden biridir. Şehrin ortasından geçen nehir kenarı, yürüyüş yolları, kafeler ve restoranlarla donatılmıştır. Gondol turları ile nehirde gezinti yapabilir, köprülerden şehrin güzel manzaralarını izleyebilirsiniz. Özellikle akşam saatlerinde ışıklandırılmış köprüler ve nehir kenarı büyüleyici bir manzara sunar.',
        'Doğal Güzellikler',
        39.7767,
        30.5206,
        'Porsuk Çayı, Eskişehir'
    ),
    (
        'a1b2c3d4-e5f6-7890-abcd-ef1234567803'::uuid,
        'Sazova Parkı',
        '400 bin metrekarelik alan üzerinde kurulu, çocuklar ve aileler için ideal eğlence ve dinlenme parkı.',
        'Sazova Parkı, Eskişehir''in en büyük ve en popüler parklarından biridir. Park içerisinde masal kahramanlarının bulunduğu Masal Şatosu, Bilim Sanat ve Kültür Parkı, hayvanat bahçesi, Türkiye''nin en büyük camilerinden biri olan Sazova Camii ve çeşitli eğlence alanları bulunmaktadır. Hafta sonları aileler için favori bir destinasyondur.',
        'Parklar',
        39.7922,
        30.4894,
        'Sazova, Eskişehir'
    ),
    (
        'a1b2c3d4-e5f6-7890-abcd-ef1234567804'::uuid,
        'Kurşunlu Külliyesi',
        '16. yüzyıldan kalma Osmanlı külliyesi, cami, hamam ve çarşıyı içerir.',
        '1525 yılında inşa edilen Kurşunlu Külliyesi, Eskişehir''in en önemli tarihi eserlerinden biridir. Cami, medrese, imaret ve çarşıdan oluşan külliye, Osmanlı mimarisinin güzel bir örneğidir. Külliye bünyesindeki Kurşunlu Camii, kurşun kaplı kubbesiyle dikkat çeker. Restore edilen yapı kompleksi, günümüzde hem dini hem de kültürel bir merkez olarak hizmet vermektedir.',
        'Tarihi Yerler',
        39.7753,
        30.5303,
        'Kurşunlu, Eskişehir'
    ),
    (
        'a1b2c3d4-e5f6-7890-abcd-ef1234567805'::uuid,
        'Kent Park',
        'Porsuk Çayı kenarında modern peyzaj düzenlemesi ile oluşturulmuş şehir parkı.',
        'Kent Park, Eskişehir''in merkezinde yer alan, modern ve geniş bir şehir parkıdır. Porsuk Çayı boyunca uzanan park, yürüyüş ve bisiklet yolları, yapay plajlar, çocuk oyun alanları ve piknik alanları ile donatılmıştır. Park içerisinde kafeler ve restoranlar bulunmaktadır. Özellikle yaz aylarında şehir halkının en çok tercih ettiği dinlenme alanlarından biridir.',
        'Parklar',
        39.7683,
        30.5147,
        'Hoşnudiye, Eskişehir'
    );

-- ============================================
-- SEED CULTURE
-- ============================================
INSERT INTO culture (id, title, short_info, main_text, category) VALUES
    (
        'b1b2c3d4-e5f6-7890-abcd-ef1234567801'::uuid,
        'Lületaşı (Meerschaum)',
        'Eskişehir''in dünyaca ünlü beyaz altını, sadece bu bölgede çıkarılan özel taş.',
        'Lületaşı, Eskişehir''in en önemli doğal zenginliklerinden biridir. Dünyada sadece bu bölgede çıkarılan bu değerli taş, yumuşak yapısı sayesinde kolayca işlenebilir. Geleneksel olarak pipo yapımında kullanılır ancak günümüzde süs eşyaları, takılar ve dekoratif objeler de üretilmektedir. Atlıhan ve Odunpazarı''nda ustalar tarafından işlenen lületaşı, Eskişehir''in kültürel mirasının önemli bir parçasıdır.',
        'El Sanatları'
    ),
    (
        'b1b2c3d4-e5f6-7890-abcd-ef1234567802'::uuid,
        'Odunpazarı Modern Müze (OMM)',
        'Çağdaş Türk sanatına adanmış, modern mimarisi ile dikkat çeken müze.',
        '2019 yılında açılan Odunpazarı Modern Müze, ünlü mimar Kengo Kuma tarafından tasarlanmıştır. Geleneksel Odunpazarı evlerinden ilham alan ahşap cephesi ile dikkat çeken müze, çağdaş Türk sanatının en önemli eserlerini sergiler. Erol Akyavaş ve Burhan Doğançay gibi önemli sanatçıların eserlerini barındıran müze, uluslararası sergiler de düzenlemektedir.',
        'Müzeler'
    ),
    (
        'b1b2c3d4-e5f6-7890-abcd-ef1234567803'::uuid,
        'Eskişehir Cam Sanatları Müzesi',
        'Türkiye''nin ilk çağdaş cam sanatları müzesi.',
        '2007 yılında Odunpazarı''nda açılan Cam Sanatları Müzesi, Türkiye''nin bu alandaki ilk müzesidir. Restore edilmiş tarihi bir binada yer alan müze, geleneksel ve çağdaş cam sanatı eserlerini sergiler. Daimi koleksiyonun yanı sıra yerli ve yabancı sanatçıların eserlerinin yer aldığı geçici sergiler de düzenlenir. Müze içinde cam sanatı atölyeleri de bulunmaktadır.',
        'Müzeler'
    ),
    (
        'b1b2c3d4-e5f6-7890-abcd-ef1234567804'::uuid,
        'Yunus Emre',
        '13. yüzyıl mutasavvıf şairi, Eskişehir''in manevi değeri.',
        'Yunus Emre, Türk tasavvuf edebiyatının en önemli isimlerinden biridir. Eskişehir''e bağlı Mihalıççık''ta doğduğu kabul edilir. Sevgi, hoşgörü ve insanlık üzerine yazdığı şiirleri yüzyıllar boyunca Türk kültürünü etkilemiştir. ''Yunus Emre Külliyesi'' Eskişehir''de anısına yapılmış önemli bir kültür merkezidir. UNESCO tarafından ''Dünya Barışına ve Diyaloga Katkı'' ödülü ile onurlandırılmıştır.',
        'Tarihi Şahsiyetler'
    ),
    (
        'b1b2c3d4-e5f6-7890-abcd-ef1234567805'::uuid,
        'Eskişehir Arkeoloji Müzesi',
        'Bölgenin zengin tarihini yansıtan eserlerle dolu müze.',
        'Eskişehir Arkeoloji Müzesi, bölgede yapılan kazılardan elde edilen eserleri sergiler. Frigler, Romalılar ve Bizans dönemlerine ait eserler müzenin koleksiyonunu oluşturur. Özellikle Frigya uygarlığından kalan eserler büyük önem taşır. Müzede ayrıca mozaikler, heykeller, sikkeler ve seramik eserler de bulunmaktadır.',
        'Müzeler'
    );

-- ============================================
-- SEED FOOD
-- ============================================
INSERT INTO food (id, name, short_info, main_text, category, ingredients) VALUES
    (
        'c1b2c3d4-e5f6-7890-abcd-ef1234567801'::uuid,
        'Çibörek',
        'Eskişehir''in en meşhur yemeği, ince hamur içinde kıymalı kızarmış börek.',
        'Çibörek, Eskişehir mutfağının vazgeçilmez lezzetidir. Tatar kökenli bu yemek, ince hamur içine konulan baharatlı kıyma ile hazırlanır ve tavada kızartılır. Dışı çıtır, içi sulu olan çibörek, genellikle ayran ile servis edilir. Şehrin her yerinde bulunabilir ancak Odunpazarı''ndaki tarihi mekanlar en otantik tatları sunar.',
        'yemek',
        ARRAY['İnce yufka', 'Kıyma', 'Soğan', 'Baharatlar', 'Tuz']
    ),
    (
        'c1b2c3d4-e5f6-7890-abcd-ef1234567802'::uuid,
        'Met Helvası',
        'Eskişehir''e özgü, karamelize şekerle yapılan geleneksel tatlı.',
        'Met helvası, Eskişehir''in en ünlü tatlılarından biridir. Un, şeker ve tereyağı kullanılarak yapılan bu özel helva, karamelize şekerin verdiği kendine has bir tat ve kokuya sahiptir. Genellikle ceviz veya fındık ile süslenerek servis edilir. Şehrin tarihi helva üreticilerinden temin edilebilir.',
        'tatlı',
        ARRAY['Un', 'Şeker', 'Tereyağı', 'Süt', 'Ceviz/Fındık']
    ),
    (
        'c1b2c3d4-e5f6-7890-abcd-ef1234567803'::uuid,
        'Balaban',
        'Kıymalı ve sebzeli, tandırda pişirilen özel kebap çeşidi.',
        'Balaban, Eskişehir''e özgü bir kebap çeşididir. Kıyma, patates, domates, biber ve baharatların bir araya gelerek tandırda pişirilmesiyle hazırlanır. Tencere kebabı tarzında servis edilen balaban, soğuk kış günlerinde en çok tercih edilen yemeklerden biridir. Pilav ve ayran ile servis edilir.',
        'yemek',
        ARRAY['Kıyma', 'Patates', 'Domates', 'Biber', 'Soğan', 'Baharatlar']
    ),
    (
        'c1b2c3d4-e5f6-7890-abcd-ef1234567804'::uuid,
        'Haşhaşlı Çörek',
        'İçi haşhaş ile doldurulmuş, tatlı yumuşak çörek.',
        'Haşhaşlı çörek, Eskişehir''in kahvaltı ve ikramlık sofralarının vazgeçilmezidir. Yumuşak hamuru ve içindeki haşhaş dolgusu ile kendine has bir lezzete sahiptir. Özellikle sabah kahvaltılarında çay ile birlikte tüketilir. Fırınlarda ve pastanelerde taze olarak bulunabilir.',
        'tatlı',
        ARRAY['Un', 'Maya', 'Süt', 'Haşhaş', 'Şeker', 'Tereyağı']
    ),
    (
        'c1b2c3d4-e5f6-7890-abcd-ef1234567805'::uuid,
        'Eskişehir Kebabı',
        'Şehre özgü baharatlarla marine edilmiş kuzu etinden yapılan kebap.',
        'Eskişehir kebabı, özel baharatlarla marine edilmiş kuzu eti kullanılarak hazırlanan bir kebap çeşididir. Mangalda közlenen et, özel sos ve garnitürlerle servis edilir. Şehirdeki kebapçılarda en popüler yemeklerden biridir ve genellikle lavaş ekmeği, közlenmiş sebzeler ve soğan ile servis edilir.',
        'yemek',
        ARRAY['Kuzu eti', 'Baharatlar', 'Soğan', 'Domates', 'Biber']
    );

-- ============================================
-- SEED MEDIA FOR PLACES
-- ============================================
INSERT INTO media (entity_type, entity_id, type, url, caption, is_main, sort_order) VALUES
    -- Odunpazarı Evleri
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567801'::uuid, 'image', 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800', 'Odunpazarı tarihi evleri', true, 0),
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567801'::uuid, 'image', 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400', 'Sokak görünümü', false, 1),
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567801'::uuid, 'video', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Odunpazarı tanıtım videosu', false, 2),
    -- Porsuk Çayı
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567802'::uuid, 'image', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Porsuk Çayı manzarası', true, 0),
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567802'::uuid, 'image', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', 'Nehir kenarı', false, 1),
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567802'::uuid, 'image', 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400', 'Gondol turları', false, 2),
    -- Sazova Parkı
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567803'::uuid, 'image', 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800', 'Sazova Parkı genel görünüm', true, 0),
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567803'::uuid, 'image', 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400', 'Masal şatosu', false, 1),
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567803'::uuid, 'image', 'https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?w=400', 'Park içi görünüm', false, 2),
    -- Kurşunlu Külliyesi
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567804'::uuid, 'image', 'https://images.unsplash.com/photo-1564769610853-feb3ee0c7d11?w=800', 'Kurşunlu Külliyesi', true, 0),
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567804'::uuid, 'image', 'https://images.unsplash.com/photo-1564769610853-feb3ee0c7d11?w=400', 'Cami dış görünüm', false, 1),
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567804'::uuid, 'image', 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=400', 'İç mekan', false, 2),
    -- Kent Park
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567805'::uuid, 'image', 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800', 'Kent Park manzarası', true, 0),
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567805'::uuid, 'image', 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400', 'Park alanı', false, 1),
    ('place', 'a1b2c3d4-e5f6-7890-abcd-ef1234567805'::uuid, 'image', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400', 'Yürüyüş yolları', false, 2);

-- ============================================
-- SEED MEDIA FOR CULTURE
-- ============================================
INSERT INTO media (entity_type, entity_id, type, url, caption, is_main, sort_order) VALUES
    -- Lületaşı
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567801'::uuid, 'image', 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800', 'Lületaşı işçiliği', true, 0),
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567801'::uuid, 'image', 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400', 'Lületaşı pipo', false, 1),
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567801'::uuid, 'image', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400', 'Usta işi eserler', false, 2),
    -- OMM
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567802'::uuid, 'image', 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800', 'OMM dış cephe', true, 0),
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567802'::uuid, 'image', 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=400', 'Müze mimarisi', false, 1),
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567802'::uuid, 'image', 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400', 'İç mekan sergi alanı', false, 2),
    -- Cam Sanatları Müzesi
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567803'::uuid, 'image', 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800', 'Cam sanatı eserleri', true, 0),
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567803'::uuid, 'image', 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400', 'Cam eserler', false, 1),
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567803'::uuid, 'image', 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400', 'Müze iç mekan', false, 2),
    -- Yunus Emre
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567804'::uuid, 'image', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800', 'Yunus Emre anıtı', true, 0),
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567804'::uuid, 'image', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', 'Yunus Emre Külliyesi', false, 1),
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567804'::uuid, 'image', 'https://images.unsplash.com/photo-1476304884326-cd2c88572c5f?w=400', 'Türbe ve müze', false, 2),
    -- Arkeoloji Müzesi
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567805'::uuid, 'image', 'https://images.unsplash.com/photo-1566127992631-137a642a90f4?w=800', 'Arkeoloji Müzesi', true, 0),
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567805'::uuid, 'image', 'https://images.unsplash.com/photo-1566127992631-137a642a90f4?w=400', 'Antik eserler', false, 1),
    ('culture', 'b1b2c3d4-e5f6-7890-abcd-ef1234567805'::uuid, 'image', 'https://images.unsplash.com/photo-1595391543833-136ac7d8222d?w=400', 'Müze koleksiyonu', false, 2);

-- ============================================
-- SEED MEDIA FOR FOOD
-- ============================================
INSERT INTO media (entity_type, entity_id, type, url, caption, is_main, sort_order) VALUES
    -- Çibörek
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567801'::uuid, 'image', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800', 'Çibörek', true, 0),
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567801'::uuid, 'image', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', 'Taze pişmiş çibörek', false, 1),
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567801'::uuid, 'image', 'https://images.unsplash.com/photo-1619623376439-b4e86ef2bc27?w=400', 'Çibörek servis', false, 2),
    -- Met Helvası
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567802'::uuid, 'image', 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800', 'Met Helvası', true, 0),
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567802'::uuid, 'image', 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400', 'Met helvası dilimi', false, 1),
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567802'::uuid, 'image', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', 'Helvacı dükkânı', false, 2),
    -- Balaban
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567803'::uuid, 'image', 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800', 'Balaban', true, 0),
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567803'::uuid, 'image', 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400', 'Tencerede balaban', false, 1),
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567803'::uuid, 'image', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', 'Balaban servis', false, 2),
    -- Haşhaşlı Çörek
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567804'::uuid, 'image', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800', 'Haşhaşlı Çörek', true, 0),
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567804'::uuid, 'image', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', 'Taze çörekler', false, 1),
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567804'::uuid, 'image', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', 'Kahvaltı sofrasında', false, 2),
    -- Eskişehir Kebabı
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567805'::uuid, 'image', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800', 'Eskişehir Kebabı', true, 0),
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567805'::uuid, 'image', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400', 'Közde kebap', false, 1),
    ('food', 'c1b2c3d4-e5f6-7890-abcd-ef1234567805'::uuid, 'image', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400', 'Kebap servis tabağı', false, 2);

-- Update video thumbnail
UPDATE media
SET thumbnail = 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400'
WHERE type = 'video' AND caption = 'Odunpazarı tanıtım videosu';
