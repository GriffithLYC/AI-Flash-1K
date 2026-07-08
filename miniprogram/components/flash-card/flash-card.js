Component({
  properties: {
    card: {
      type: Object,
      value: null,
      observer(newVal) {
        if (newVal) {
          this.resetCard();
        }
      }
    }
  },

  data: {
    offsetX: 0,
    offsetY: 0,
    rotate: 0,
    opacity: 1,
    scale: 1,
    swipeHint: '',
    hintOpacity: 0,
    isAnimating: false
  },

  methods: {
    resetCard() {
      this.setData({
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        opacity: 1,
        scale: 1,
        swipeHint: '',
        hintOpacity: 0,
        isAnimating: false
      });
    },

    onTouchStart(e) {
      if (this.data.isAnimating) return;
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.setData({ isAnimating: false });
    },

    onTouchMove(e) {
      if (this.data.isAnimating) return;
      const moveX = e.touches[0].clientX;
      const moveY = e.touches[0].clientY;
      const deltaX = moveX - this.startX;
      const deltaY = moveY - this.startY;

      // 限制纵向移动
      const limitedY = deltaY * 0.3;
      // 计算旋转角度
      const rotate = deltaX * 0.05;
      // 计算提示文字
      const threshold = 80;
      let swipeHint = '';
      let hintOpacity = 0;

      if (deltaX > threshold) {
        swipeHint = '记得';
        hintOpacity = Math.min(1, (deltaX - threshold) / 100);
      } else if (deltaX < -threshold) {
        swipeHint = '不记得';
        hintOpacity = Math.min(1, (-deltaX - threshold) / 100);
      }

      this.setData({
        offsetX: deltaX,
        offsetY: limitedY,
        rotate: rotate,
        swipeHint,
        hintOpacity
      });
    },

    onTouchEnd(e) {
      if (this.data.isAnimating) return;
      const { offsetX } = this.data;
      const threshold = 100;

      if (offsetX > threshold) {
        this.swipeRight();
      } else if (offsetX < -threshold) {
        this.swipeLeft();
      } else {
        this.springBack();
      }
    },

    swipeRight() {
      this.setData({ isAnimating: true });
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-out'
      });
      animation.translate(600, -50).rotate(30).opacity(0).step();

      this.setData({
        animationData: animation.export()
      });

      setTimeout(() => {
        this.triggerEvent('swipe', { direction: 'right', card: this.properties.card });
        this.resetCard();
      }, 300);
    },

    swipeLeft() {
      this.setData({ isAnimating: true });
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-out'
      });
      animation.translate(-600, -50).rotate(-30).opacity(0).step();

      this.setData({
        animationData: animation.export()
      });

      setTimeout(() => {
        this.triggerEvent('swipe', { direction: 'left', card: this.properties.card });
        this.resetCard();
      }, 300);
    },

    springBack() {
      this.setData({ isAnimating: true });
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-out'
      });
      animation.translate(0, 0).rotate(0).step();

      this.setData({
        animationData: animation.export(),
        swipeHint: '',
        hintOpacity: 0
      });

      setTimeout(() => {
        this.setData({ isAnimating: false });
      }, 300);
    },

    onTapDetail() {
      this.triggerEvent('detail', { card: this.properties.card });
    },

    onTapAudio() {
      // 调用微信语音合成（模拟）
      const { card } = this.properties;
      if (!card) return;
      const text = card.term + '. ' + card.translation;
      wx.showToast({ title: '朗读: ' + card.term, icon: 'none' });
      this.triggerEvent('audio', { card });
    }
  }
});
