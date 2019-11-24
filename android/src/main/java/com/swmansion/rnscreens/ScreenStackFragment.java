package com.swmansion.rnscreens;

import android.annotation.SuppressLint;
import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import com.facebook.react.uimanager.PixelUtil;
import com.google.android.material.appbar.AppBarLayout;
import com.google.android.material.appbar.CollapsingToolbarLayout;

import androidx.annotation.Nullable;
import androidx.coordinatorlayout.widget.CoordinatorLayout;

public class ScreenStackFragment extends ScreenFragment {

  private static final float TOOLBAR_ELEVATION = PixelUtil.toPixelFromDIP(4);

  private AppBarLayout mAppBarLayout;
  private boolean mShadowHidden;

  @SuppressLint("ValidFragment")
  public ScreenStackFragment(Screen screenView) {
    super(screenView);
  }

  public void removeToolbar() {
    CoordinatorLayout contentView = (CoordinatorLayout) getView();
    contentView.setFitsSystemWindows(false);

    if (mAppBarLayout != null) {
      contentView.removeView(mAppBarLayout);
      mAppBarLayout = null;
    }

    contentView.requestApplyInsets();
  }

  public void setToolbar(CollapsingToolbarLayout toolbar) {
    CoordinatorLayout contentView = (CoordinatorLayout) getView();
    contentView.setFitsSystemWindows(true);

    if (mAppBarLayout == null) {
      mAppBarLayout = new AppBarLayout(getContext());
      // By default AppBarLayout will have a background color set but since we cover the whole layout
      // with toolbar (that can be semi-transparent) the bar layout background color does not pay a
      // role. On top of that it breaks screens animations when alfa offscreen compositing is off
      // (which is the default)
      mAppBarLayout.setBackgroundColor(Color.TRANSPARENT);
      FrameLayout.LayoutParams appBarLayoutParams = new FrameLayout.LayoutParams(
          FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT);
      mAppBarLayout.setLayoutParams(appBarLayoutParams);
      mAppBarLayout.setFitsSystemWindows(true);

      mAppBarLayout.addView(toolbar);
      contentView.addView(mAppBarLayout);
    }

    contentView.requestApplyInsets();
  }

  public void setToolbarShadowHidden(boolean hidden) {
    if (mShadowHidden != hidden) {
      mAppBarLayout.setTargetElevation(hidden ? 0 : TOOLBAR_ELEVATION);
      mShadowHidden = hidden;
    }
  }

  public void onStackUpdate() {
    View child = mScreenView.getChildAt(0);
    if (child instanceof ScreenStackHeaderConfig) {
      ((ScreenStackHeaderConfig) child).onUpdate();
    }
  }

  @Override
  public View onCreateView(LayoutInflater inflater,
                           @Nullable ViewGroup container,
                           @Nullable Bundle savedInstanceState) {
    CoordinatorLayout view = new CoordinatorLayout(getContext());
    CoordinatorLayout.LayoutParams params = new CoordinatorLayout.LayoutParams(
        LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT);
    params.setBehavior(new AppBarLayout.ScrollingViewBehavior());
    mScreenView.setLayoutParams(params);
    view.addView(mScreenView);

    return view;
  }

  public boolean isDismissable() {
    View child = mScreenView.getChildAt(0);
    if (child instanceof ScreenStackHeaderConfig) {
      return ((ScreenStackHeaderConfig) child).isDismissable();
    }
    return true;
  }
}
